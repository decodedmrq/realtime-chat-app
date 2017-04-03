<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->nullable();
            $table->integer('series_id')->nullable();
            $table->integer('publisher_id')->nullable();
            $table->integer('category_id')->nullable();
            $table->boolean('is_activated')->default(true);
            $table->string('name');
            $table->string('slug');
            $table->text('description')->nullable();
            $table->string('cover_image')->nullable();
            $table->string('preview_file')->nullable();
            $table->string('language_code', 10)->nullable();
            $table->string('isbn')->nullable();
            $table->integer('price')->nullable();
            $table->integer('pages')->default(0);
            $table->integer('favorite_count')->default(0);
            $table->integer('comment_count')->default(0);
            $table->integer('download_count')->default(0);
            $table->integer('view_count')->default(0);
            $table->integer('rating_count')->default(0);
            $table->dateTime('published_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('books');
    }
}
