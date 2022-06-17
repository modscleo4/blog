<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'username' => 'modscleo4',
            'name' => 'John Doe',
            'email' => 'modscleo4@modscleo4.dev.br',
            'password' => Hash::make('password')
        ]);
    }
}
