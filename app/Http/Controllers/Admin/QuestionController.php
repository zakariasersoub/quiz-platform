<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\Answer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Questions/Index', [
            'questions' => Question::with('answers')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'text' => 'required|string',
            'type' => 'required|in:scq,mcq',
            'answers' => 'required|array|min:2',
            'answers.*.text' => 'required|string',
            'answers.*.is_correct' => 'boolean',
        ]);

        $question = Question::create([
            'text' => $validated['text'],
            'type' => $validated['type'],
        ]);

        foreach ($validated['answers'] as $answerData) {
            $question->answers()->create([
                'text' => $answerData['text'],
                'is_correct' => $answerData['is_correct'] ?? false,
            ]);
        }

        return redirect()->back();
    }

    public function update(Request $request, Question $question)
    {
        $validated = $request->validate([
            'text' => 'required|string',
            'type' => 'required|in:scq,mcq',
            'answers' => 'required|array|min:2',
            'answers.*.id' => 'nullable|exists:answers,id',
            'answers.*.text' => 'required|string',
            'answers.*.is_correct' => 'boolean',
        ]);

        $question->update([
            'text' => $validated['text'],
            'type' => $validated['type'],
        ]);

        // Sync answers
        $existingAnswerIds = [];
        foreach ($validated['answers'] as $answerData) {
            if (isset($answerData['id'])) {
                $answer = Answer::find($answerData['id']);
                $answer->update([
                    'text' => $answerData['text'],
                    'is_correct' => $answerData['is_correct'] ?? false,
                ]);
                $existingAnswerIds[] = $answer->id;
            } else {
                $newAnswer = $question->answers()->create([
                    'text' => $answerData['text'],
                    'is_correct' => $answerData['is_correct'] ?? false,
                ]);
                $existingAnswerIds[] = $newAnswer->id;
            }
        }

        $question->answers()->whereNotIn('id', $existingAnswerIds)->delete();

        return redirect()->back();
    }

    public function destroy(Question $question)
    {
        $question->delete();
        return redirect()->back();
    }
}
