<?php

namespace Database\Seeders;

use App\Models\Question;
use App\Models\Answer;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            ["What is the capital of France?", "scq", [["Berlin", false], ["Madrid", false], ["Paris", true], ["Rome", false]]],
            ["Which of these are programming languages?", "mcq", [["Python", true], ["HTML", false], ["Java", true], ["CSS", false]]],
            ["What is the largest planet in our solar system?", "scq", [["Earth", false], ["Jupiter", true], ["Mars", false], ["Saturn", false]]],
            ["Who wrote 'Romeo and Juliet'?", "scq", [["Charles Dickens", false], ["William Shakespeare", true], ["Mark Twain", false], ["Jane Austen", false]]],
            ["Which of these animals are mammals?", "mcq", [["Dolphin", true], ["Shark", false], ["Bat", true], ["Turtle", false]]],
            ["What is the chemical symbol for gold?", "scq", [["Ag", false], ["Au", true], ["Pb", false], ["Fe", false]]],
            ["Which planets are considered gas giants?", "mcq", [["Jupiter", true], ["Earth", false], ["Saturn", true], ["Venus", false]]],
            ["In what year did the Titanic sink?", "scq", [["1912", true], ["1905", false], ["1898", false], ["1923", false]]],
            ["Which of these are European countries?", "mcq", [["Brazil", false], ["Germany", true], ["Japan", false], ["France", true]]],
            ["What is the hardest natural substance on Earth?", "scq", [["Gold", false], ["Iron", false], ["Diamond", true], ["Quartz", false]]],
            ["Which of these are prime numbers?", "mcq", [["2", true], ["4", false], ["7", true], ["9", false]]],
            ["What is the square root of 64?", "scq", [["6", false], ["7", false], ["8", true], ["9", false]]],
            ["Which colors are primary colors?", "mcq", [["Red", true], ["Green", false], ["Blue", true], ["Purple", false]]],
            ["Who painted the Mona Lisa?", "scq", [["Vincent van Gogh", false], ["Leonardo da Vinci", true], ["Pablo Picasso", false], ["Claude Monet", false]]],
            ["Which of these are operating systems?", "mcq", [["Linux", true], ["Windows", true], ["Microsoft Word", false], ["Google Chrome", false]]],
            ["What is the longest river in the world?", "scq", [["Amazon", false], ["Nile", true], ["Yangtze", false], ["Mississippi", false]]],
            ["Which of these are front-end web technologies?", "mcq", [["React", true], ["Laravel", false], ["Vue", true], ["MySQL", false]]],
            ["What is the capital of Japan?", "scq", [["Seoul", false], ["Beijing", false], ["Tokyo", true], ["Bangkok", false]]],
            ["Which of these are considered birds?", "mcq", [["Penguin", true], ["Bat", false], ["Ostrich", true], ["Platypus", false]]],
            ["How many continents are there?", "scq", [["5", false], ["6", false], ["7", true], ["8", false]]],
            ["Which of these elements are noble gases?", "mcq", [["Helium", true], ["Oxygen", false], ["Neon", true], ["Nitrogen", false]]],
            ["What is the freezing point of water in Celsius?", "scq", [["0", true], ["32", false], ["100", false], ["-1", false]]],
            ["Which of these are popular Javascript frameworks?", "mcq", [["Angular", true], ["Django", false], ["Svelte", true], ["Spring", false]]],
            ["Who discovered gravity?", "scq", [["Albert Einstein", false], ["Isaac Newton", true], ["Galileo Galilei", false], ["Nikola Tesla", false]]],
            ["Which of the following are relational database systems?", "mcq", [["MongoDB", false], ["MySQL", true], ["PostgreSQL", true], ["Redis", false]]],
            ["What is the currency of the United Kingdom?", "scq", [["Euro", false], ["Dollar", false], ["Pound Sterling", true], ["Yen", false]]],
            ["Which of these are valid HTTP methods?", "mcq", [["GET", true], ["FETCH", false], ["POST", true], ["RECEIVE", false]]],
            ["Which planet is known as the Red Planet?", "scq", [["Venus", false], ["Mars", true], ["Jupiter", false], ["Mercury", false]]],
            ["Which of these are CSS preprocessors?", "mcq", [["Sass", true], ["Tailwind", false], ["LESS", true], ["Bootstrap", false]]],
            ["What is the capital of Australia?", "scq", [["Sydney", false], ["Melbourne", false], ["Canberra", true], ["Perth", false]]],
            ["Which of these are continents?", "mcq", [["Africa", true], ["Russia", false], ["Antarctica", true], ["India", false]]],
            ["Who is the author of 'Harry Potter'?", "scq", [["J.R.R. Tolkien", false], ["J.K. Rowling", true], ["Stephen King", false], ["George R.R. Martin", false]]],
            ["Which of these sports use a ball?", "mcq", [["Soccer", true], ["Ice Hockey", false], ["Basketball", true], ["Swimming", false]]],
            ["What does HTML stand for?", "scq", [["Hyper Text Markup Language", true], ["High Tech Modern Language", false], ["Hyperlink and Text Markup Language", false], ["Home Tool Markup Language", false]]],
            ["Which of the following are fruit?", "mcq", [["Tomato", true], ["Potato", false], ["Apple", true], ["Carrot", false]]],
            ["What is the smallest prime number?", "scq", [["0", false], ["1", false], ["2", true], ["3", false]]],
            ["Which of these are valid variable declarations in JavaScript?", "mcq", [["let", true], ["dim", false], ["const", true], ["var", true]]],
            ["How many days are in a leap year?", "scq", [["365", false], ["366", true], ["364", false], ["367", false]]],
            ["Which of the following are musical instruments?", "mcq", [["Piano", true], ["Stethoscope", false], ["Violin", true], ["Microscope", false]]],
            ["What is the main ingredient in guacamole?", "scq", [["Tomato", false], ["Avocado", true], ["Onion", false], ["Pepper", false]]],
            ["Which of these are car manufacturers?", "mcq", [["Toyota", true], ["Boeing", false], ["Ford", true], ["Airbus", false]]],
            ["Which element has the atomic number 1?", "scq", [["Oxygen", false], ["Helium", false], ["Hydrogen", true], ["Carbon", false]]],
            ["Which of the following are parts of a computer?", "mcq", [["CPU", true], ["Engine", false], ["RAM", true], ["Alternator", false]]],
            ["What is the official language of Brazil?", "scq", [["Spanish", false], ["Portuguese", true], ["English", false], ["French", false]]],
            ["Which of these are recognized oceans?", "mcq", [["Atlantic", true], ["Mediterranean", false], ["Pacific", true], ["Caribbean", false]]],
            ["Who was the first President of the United States?", "scq", [["Abraham Lincoln", false], ["George Washington", true], ["Thomas Jefferson", false], ["John Adams", false]]],
            ["Which of the following are types of clouds?", "mcq", [["Cumulus", true], ["Stratus", true], ["Nimbus", true], ["Stellar", false]]],
            ["What is the largest ocean on Earth?", "scq", [["Atlantic", false], ["Indian", false], ["Pacific", true], ["Arctic", false]]],
            ["Which of these are search engines?", "mcq", [["Google", true], ["Facebook", false], ["Bing", true], ["Amazon", false]]],
            ["What year did the Apollo 11 moon landing happen?", "scq", [["1969", true], ["1970", false], ["1965", false], ["1972", false]]],
        ];

        foreach ($data as $qData) {
            $question = Question::create([
                'text' => $qData[0],
                'type' => $qData[1]
            ]);

            foreach ($qData[2] as $ansData) {
                $question->answers()->create([
                    'text' => $ansData[0],
                    'is_correct' => $ansData[1]
                ]);
            }
        }
    }
}
