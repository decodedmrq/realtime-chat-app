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
        DB::table('users')->insert([
            'nickname' => 'Bob',
            'first_name' => 'Jerry',
            'last_name' => 'Bob',
            'email' => 'bob@gmail.com',
            'role' => 1,
            'password' => bcrypt('123123')
        ]);
        DB::table('users')->insert([
            'nickname' => 'Doug',
            'first_name' => 'Doug',
            'last_name' => 'Terry',
            'email' => 'terry@gmail.com',
            'role' => 1,
            'password' => bcrypt('123123')
        ]);

        DB::table('threads')->insert([
            'id' => 1,
        ]);

        DB::table('thread_participants')->insert([
            'thread_id' => '1',
            'user_id' => '1',
        ]);

        //Messages
        DB::table('messages')->insert([
            'thread_id' => 1,
            'sender_id' => 1,
            'body' => 'Hey, How about a beer eh ?'
        ]);
        DB::table('messages')->insert([
            'thread_id' => 1,
            'sender_id' => 2,
            'body' => 'Right on. Where we goin"hose head ?'
        ]);
        DB::table('messages')->insert([
            'thread_id' => 1,
            'sender_id' => 1,
            'body' => 'I say the Legion"cause I"m there now eh.'
        ]);

        //Message state
        $dt =\Carbon\Carbon::now();
        DB::table('message_read_states')->insert([
            'user_id' => 1,
            'message_id' => 1,
            'read_date' => $dt,
        ]);
        DB::table('message_read_states')->insert([
            'user_id' => 2,
            'message_id' => 1,
            'read_date' => $dt->addMinute(),
        ]);
        DB::table('message_read_states')->insert([
            'user_id' => 2,
            'message_id' => 2,
            'read_date' => $dt->addMinute(),
        ]);
        DB::table('message_read_states')->insert([
            'user_id' => 1,
            'message_id' => 2,
            'read_date' => $dt->addMinute(),
        ]);
        DB::table('message_read_states')->insert([
            'user_id' => 1,
            'message_id' => 3,
            'read_date' => $dt->addMinute(),
        ]);
        DB::table('message_read_states')->insert([
            'user_id' => 2,
            'message_id' => 3,
            'read_date' => $dt->addMinute(),
        ]);
    }
}
