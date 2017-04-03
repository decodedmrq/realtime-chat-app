<?php
/**
 * Created by IntelliJ IDEA.
 * User: mon.ls
 * Date: 11/5/2016
 * Time: 10:13 PM
 */

namespace App\Models;


use App\Events\BookCreated;
use App\Events\BookDeleted;
use Conner\Tagging\Taggable;
use Cviebrock\EloquentSluggable\Sluggable;

class Book extends Model
{
    use Sluggable, Taggable;

    const VIEW_HOME = 'home';
    const VIEW_POPULAR = 'popular';
    const VIEW_MOST_DOWNLOADED = 'most downloaded';
    const VIEW_RECENT_UPLOADS = 'recent_uploads';


    protected $guarded = ['id'];

    protected $dates = ['published_at'];

    protected $with = ['authors', 'publisher', 'series', 'category'];

    protected $events = [
        'saved' => BookCreated::class,
        'deleted' => BookDeleted::class,
    ];

    public function authors()
    {
        return $this->belongsToMany(Author::class, 'book_authors');
    }

    public function publisher()
    {
        return $this->belongsTo(Publisher::class);
    }

    public function series()
    {
        return $this->belongsTo(Series::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function files()
    {
        return $this->hasMany(BookFile::class);
    }

    public function ratings()
    {
        return $this->morphMany(Rating::class, 'ratingable');
    }

    public function favorites()
    {
        return $this->morphMany(Favorite::class, 'favoriteable');
    }

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'name',
            ],
        ];
    }


    public function scopePopular($query)
    {
        return $query->orderBy('comment_count', 'desc')
            ->orderBy('rating_count', 'desc')
            ->orderBy('view_count', 'desc')
            ->orderBy('favorite_count', 'desc')
            ->mostDownloaded();
    }

    public function scopeMostDownloaded($query)
    {
        return $query->orderBy('download_count', 'desc');
    }

    public function scopeRecentUploads($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    public function scopeRecommend($query)
    {
        return $query->inRandomOrder();
//        ->whereDate('published_at', '=', Carbon::today()->toDateString())
    }
}
