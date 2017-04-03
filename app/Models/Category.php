<?php
/**
 * Created by IntelliJ IDEA.
 * User: mon.ls
 * Date: 11/5/2016
 * Time: 10:13 PM
 */

namespace App\Models;


use Cviebrock\EloquentSluggable\Sluggable;

class Category extends Model
{
    use Sluggable;
    protected $guarded = ['id'];

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

    public function scopeMostSearch($query)
    {
        return $query->orderBy('count', 'desc');
    }
}
