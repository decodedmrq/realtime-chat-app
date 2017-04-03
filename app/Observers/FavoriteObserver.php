<?php
/**
 * Created by IntelliJ IDEA.
 * User: mon.ls
 * Date: 11/6/2016
 * Time: 5:05 AM
 */

namespace App\Observers;


use App\Models\Book;
use App\Models\Favorite;

class FavoriteObserver
{
    /**
     * Listen to the User created event.
     *
     * @param  Favorite $favorite
     * @return void
     */
    public function created(Favorite $favorite)
    {
        if ($favorite->favoriteable_type == Book::class) {
            $favorite->favoriteable()->increment('favorite_count');
        }
    }

    /**
     * Listen to the User deleting event.
     *
     * @param Favorite $favorite
     */
    public function deleting(Favorite $favorite)
    {
        if ($favorite->favoriteable_type == Book::class) {
            $favorite->favoriteable()->decrement('favorite_count');
        }
    }
}
