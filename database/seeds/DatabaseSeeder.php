<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->truncate();
        DB::table('users')->insert([
            'email' => 'thanhchoco@gmail.com',
            'password' => bcrypt('123123'),
        ]);
        $categories = [
            'Technology',
            'Computers',
            'Economy',
            'Education',
        ];
        $data = [];
        foreach ($categories as $category) {
            $data[] = [
                'name' => $category,
                'slug' => str_slug($category)
            ];
        }
        Db::table('categories')->insert(
            $data
        );
        factory(\App\Models\Book::class, 25)->create();
        factory(\App\Models\BookAuthor::class, 25)->create();
    }
}
