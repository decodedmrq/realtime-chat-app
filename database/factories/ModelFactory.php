<?php

/*
|--------------------------------------------------------------------------
| Models Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your Models factories. Models factories give
| you a convenient way to create Modelss for testing and seeding your
| database. Just tell the factory how a default Models should look.
|
*/

use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Publisher;
use App\Models\Series;

$factory->define(App\Models\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Models\Author::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
    ];
});
$factory->define(App\Models\Category::class, function (Faker\Generator $faker) {
    $categories = [
        'Technology',
        'Computers',
        'Economy',
        'Education',
    ];

    return [
        'name' => $categories[array_rand($categories)],
    ];
});

$factory->define(App\Models\Publisher::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
    ];
});
$factory->define(App\Models\Series::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->sentence,
    ];
});
$factory->define(App\Models\Book::class, function (Faker\Generator $faker) {
    $languages = ['en', 'zh'];

    return [
        'name' => $faker->text(40),
        'category_id' => Category::find(rand(1, 4))->id,
        'publisher_id' => factory(Publisher::class)->create()->id,
        'series_id' => factory(Series::class)->create()->id,
        'description' => $faker->realText(150),
        'isbn' => $faker->buildingNumber,
        'language_code' => $languages[array_rand($languages)],
        'download_count' => $faker->numberBetween(1000, 400000),
        'view_count' => $faker->numberBetween(1000, 400000),
        'favorite_count' => $faker->numberBetween(20, 4000),
        'pages' => $faker->numberBetween(20, 400),
        'published_at' => $faker->dateTime,
    ];
});

$factory->define(App\Models\BookAuthor::class, function ($faker) {
    return [
        'book_id' => factory(Book::class)->create()->id,
        'author_id' => factory(Author::class)->create()->id,
    ];
});
