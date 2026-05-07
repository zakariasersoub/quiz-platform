<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Question;
use App\Models\Answer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Admin User
        User::updateOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
            ]
        );

        // 2. Create 50 Questions
        for ($i = 1; $i <= 50; $i++) {
            $question = Question::create([
                'text' => "Sample Question Number $i: What is the result of " . ($i * 2) . " + " . ($i * 5) . "?",
                'type' => 'scq', // Single Choice Question
            ]);

            $correctIndex = rand(0, 3);
            for ($j = 0; $j < 4; $j++) {
                Answer::create([
                    'question_id' => $question->id,
                    'text' => "Answer Option " . ($j + 1) . " (Value: " . (($i * 7) + $j - $correctIndex) . ")",
                    'is_correct' => ($j === $correctIndex),
                ]);
            }
        }
    }
}
