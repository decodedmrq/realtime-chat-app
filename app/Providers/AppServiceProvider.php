<?php

namespace App\Providers;

use App\Models\Book;
use App\Models\Favorite;
use App\Models\Rating;
use App\Observers\BookObserver;
use App\Observers\FavoriteObserver;
use App\Observers\RatingObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Rating::observe(RatingObserver::class);
        Favorite::observe(FavoriteObserver::class);
        Book::observe(BookObserver::class);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        require app_path('Helpers/function.php');
    }
}
