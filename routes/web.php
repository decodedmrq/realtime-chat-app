<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/home', 'HomeController@index');
Route::group(['middleware' => ['auth', 'role:' . \App\Models\User::ADMIN]], function () {
    Route::get('/', 'DashboardController@index')->name('home');

    Route::get('/category/search', 'CategoryController@search');

    Route::post('/book/{id}/upload', 'BookController@upload');
    Route::delete('/book/{id}/files', 'BookController@removeFile');

    Route::resource('dashboard', 'DashboardController');
    Route::resource('book', 'BookController');
    Route::resource('category', 'CategoryController');
});
