<?php
/**
 * Created by IntelliJ IDEA.
 * User: mon.ls
 * Date: 11/6/2016
 * Time: 5:05 AM
 */

namespace App\Observers;


use App\Models\Book;
use App\Models\Rating;

class RatingObserver
{
    /**
     * Listen to the User created event.
     *
     * @param  Rating $rating
     * @return void
     */
    public function created(Rating $rating)
    {
        if ($rating->ratingable_type == Book::class) {
            $rating->ratingable()->increment('rating_count');
        }
    }

    /**
     * Listen to the User deleting event.
     *
     * @param  Rating $rating
     * @return void
     */
    public function deleting(Rating $rating)
    {
        if ($rating->ratingable_type == Book::class) {
            $rating->ratingable()->decrement('rating_count');
        }
    }
}
