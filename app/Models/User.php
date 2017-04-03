<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Cashier\Billable;

class User extends Authenticatable
{
    use Notifiable, Billable;

    const MEMBER = 0;
    const ADMIN = 1;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $dates = ['trial_ends_at'];

    /**
     * Check user role
     * @param int $role
     * @return bool
     */
    public function hasRole(int $role) : bool
    {
        if ($this->role === User::ADMIN) {
            return true;
        }

        return $this->role === $role;
    }

    public function getNameAttribute()
    {
        $name = $this->last_name . ' ' . $this->first_name;
        if (!$this->last_name && !$this->first_name) {
            $name = $this->email;
        }

        return $name;
    }

}
