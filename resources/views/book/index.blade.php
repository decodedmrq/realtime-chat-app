@extends('layouts.desktop')

@section('content')
    <div class="row mb-2">
        <div class="col">
            <form class="form-inline" action="{{ route('book.index') }}">
                <div class="form-group">
                    <input name="keyword" type="text" class="form-control" id="keyword" placeholder="Search book...">
                </div>
                <button type="submit" class="btn btn-primary">Search</button>
                <a href="{{ route('book.index') }}" class="btn btn-secondary ml-2">Clear</a>
            </form>

        </div>
        <div class="col">
            <a class="btn btn-primary float-right" href="{{ route('book.create') }}">Upload new book</a>
        </div>
    </div>
    <div class="float-right">
        {{ $books->links('vendor.pagination.bootstrap-4') }}
    </div>
    <table class="table bg-white table-hover">
        <caption>Total {{ $books->total() }} books</caption>
        <thead class="thead-inverse">
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Publisher</th>
            <th>Download</th>
            <th>View</th>
            <th>Comment</th>
            <th>Category</th>
            <th>Language</th>
            <th>Last Update</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        @forelse($books as $book)
            <tr>
                <th scope="row">{{ $book->id }}</th>
                <td>{{ $book->name }}</td>
                <td>{{ $book->publisher ?  $book->publisher->name : trans('string.unknown') }}</td>
                <td>{{ number_format($book->download_count) }}</td>
                <td>{{ number_format($book->view_count) }}</td>
                <td>{{ number_format($book->comment_count) }}</td>
                <td>{{$book->category ?  $book->category->name : trans('string.unknown') }}</td>
                <td>{{ trans("array.languages.{$book->language_code}") }}</td>
                <td>{{ $book->updated_at->diffForHumans() }}</td>
                <td>
                    {{ link_to_route('book.edit', trans('string.edit'), $book) }}
                </td>
            </tr>
            @empty
            <tr><td>No Records</td></tr>
            @endforelse
        </tbody>
    </table>
    <div class="float-right">
        {{ $books->links('vendor.pagination.bootstrap-4') }}
    </div>
@endsection
