<?php
/**
 * Created by IntelliJ IDEA.
 * User: mon.ls
 * Date: 11/5/2016
 * Time: 10:13 PM
 */

namespace App\Models;


class Favorite extends Model
{
    protected $table = 'user_favorites';

    protected $guarded = ['id'];

    public function favoriteable()
    {
        return $this->morphTo();
    }
}
