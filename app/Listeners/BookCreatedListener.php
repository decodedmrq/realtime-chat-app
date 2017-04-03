<?php

namespace App\Listeners;

use App\Events\BookCreated;

class BookCreatedListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  BookCreated $event
     * @return void
     */
    public function handle(BookCreated $event)
    {

    }

    public function failed(BookCreated $event, $exception)
    {
        //
    }
}
