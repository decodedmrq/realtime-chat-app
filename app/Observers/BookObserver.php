<?php
/**
 * Created by IntelliJ IDEA.
 * User: mon.ls
 * Date: 11/6/2016
 * Time: 5:05 AM
 */

namespace App\Observers;


use App\Models\Book;

class BookObserver
{
    /**
     * Listen to the User created event.
     *
     * @param  Book $book
     * @return void
     */
    public function created(Book $book)
    {
        $book->category()->increment('count');
    }

    /**
     * Listen to the User deleting event.
     *
     * @param Book $book
     */
    public function deleting(Book $book)
    {
        $book->category()->decrement('count');
    }

    /**
     * Listen to the User updating event.
     *
     * @param Book $book
     */
    public function updating(Book $book)
    {
        if ($book->category_id) $book->category()->increment('count');
    }
}
