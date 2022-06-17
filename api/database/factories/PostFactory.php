<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition(): array
    {
    	return [
            'user_id' => $this->faker->numberBetween(1, User::max('id')),
            'title' => $this->faker->sentence,
            'resume' => $this->faker->text,
            'body' => $this->faker->paragraphs(5, true),
            'image' => $this->faker->imageUrl(),
    	];
    }
}
