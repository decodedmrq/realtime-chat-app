<?php
/**
 * Created by IntelliJ IDEA.
 * User: mon.ls
 * Date: 11/5/2016
 * Time: 10:13 PM
 */

namespace App\Models;


class Rating extends Model
{
    protected $table = 'user_ratings';

    protected $guarded = ['id'];

    public function ratingable()
    {
        return $this->morphTo();
    }
}
