<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\BookFile;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    /**
     * BookController constructor.
     */
    public function __construct()
    {

    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $book = Book::query();
        if ($request->has('keyword')) {
            $keyword = $request->get('keyword');
            if ($keyword)
                $book->where('name', 'like', "%{$keyword}%")
                    ->orWhere('slug', 'like', "%{$keyword}%")
                    ->orWhere('language_code', 'like', "%{$keyword}%")
                    ->orWhere('isbn', 'like', "%{$keyword}%")
                    ->orWhereHas('authors', function ($query) use ($keyword) {
                        $query->where('name', 'like', '%' . $keyword . '%');
                    })
                    ->orWhereHas('publisher', function ($query) use ($keyword) {
                        $query->where('name', 'like', '%' . $keyword . '%');
                    })
                    ->orWhereHas('category', function ($query) use ($keyword) {
                        $query->where('name', 'like', '%' . $keyword . '%');
                    })
                    ->orWhereHas('series', function ($query) use ($keyword) {
                        $query->where('name', 'like', '%' . $keyword . '%');
                    });
        }

        return $this->with('books', $book->recentUploads()->paginate())
            ->renderView('index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return $this->renderView('create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $book = Book::create($request->all());
//        $book->category_id = $request->get('category_id');
//        $book->series_id = $request->get('series_id');
//        $book->publisher_id = $request->get('publisher_id');
//        $book->name = $request->get('name');
//        $book->price = $request->get('price');
//        $book->description = $request->get('description');
//        $book->isbn = $request->get('isbn');
//        $book->language_code = $request->get('language_code');
//        $book->pages = $request->get('pages');
//        $book->save();

        return response()->json($book);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $book = Book::find($id);
//        $book->category_id = $request->get('category_id');
//        $book->series_id = $request->get('series_id');
//        $book->publisher_id = $request->get('publisher_id');
//        $book->name = $request->get('name');
//        $book->price = $request->get('price');
//        $book->description = $request->get('description');
//        $book->isbn = $request->get('isbn');
//        $book->language_code = $request->get('language_code');
//        $book->pages = $request->get('pages');
        $saved = $book->update(array_map('trim', $request->all()));

        return response()->json(['success' => $saved]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function upload(Request $request, $id)
    {
        $book = Book::find($id);
        $file = $request->file('file');
        $isCoverImage = $request->has('cover_image');
        if ($file instanceof UploadedFile) {
            $fileName = md5($book->id . $file->getClientOriginalName() . $file->getClientOriginalExtension()) . '.' . strtolower($file->getClientOriginalExtension());
            if ($isCoverImage) {
                $fileName = md5($book->id . 'cover') . '.' . strtolower($file->getClientOriginalExtension());
                $book->cover_image = $fileName;
                $saved = $file->storePubliclyAs('books/covers/', $fileName) && $book->save();

                return response()->json(['success' => $saved, 'name' => $fileName], $saved ? 200 : Response::HTTP_BAD_REQUEST);
            }
            $bookFile = new BookFile([
                'name' => $fileName,
                'extension' => strtolower($file->getClientOriginalExtension()),
                'size' => $file->getSize(),
            ]);

            $saved = $file->storeAs('books/files', $fileName) && $book->files()->save($bookFile);

            return response()->json(['success' => $saved, 'name' => $fileName], $saved ? 200 : Response::HTTP_BAD_REQUEST);
        }

        return response()->json(['success' => false], Response::HTTP_BAD_REQUEST);
    }


    public function removeFile($bookId)
    {
        $book = Book::find($bookId);
        $fileName = request('name');
        $isCoverImage = request('cover_image');
        if ($isCoverImage) {
            $book->cover_image = null;
            $path = 'books/covers/' . $fileName;
            $deleted = Storage::delete($path) && $book->save();
            return response()->json(['success' => $deleted]);
        }
        $file = $book->files->where('name', $fileName)->first();
        if (!$file) return response()->json(['success' => false], Response::HTTP_BAD_REQUEST);
        $path = 'books/files/' . $file->name;
        $deleted = Storage::delete($path) && $file->delete();

        return response()->json(['success' => $deleted, 'message' => 'Tệp tin đã bị xóa']);
    }
}
