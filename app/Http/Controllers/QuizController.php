<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\QuizSession;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            'canLogin' => \Illuminate\Support\Facades\Route::has('login'),
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    public function start(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255'
        ]);

        $session = QuizSession::create([
            'username' => $request->username,
        ]);

        $request->session()->put('quiz_session_id', $session->id);

        return redirect()->route('quiz.show');
    }

    public function show(Request $request)
    {
        $sessionId = $request->session()->get('quiz_session_id');
        
        if (!$sessionId) {
            return redirect()->route('home');
        }

        $session = QuizSession::findOrFail($sessionId);

        if ($session->completed_at) {
            return redirect()->route('quiz.result', ['id' => $session->id]);
        }

        $numQuestions = Setting::where('key', 'questions_per_session')->value('value') ?? 10;

        $questions = Question::with('answers')->inRandomOrder()->limit((int) $numQuestions)->get();

        return Inertia::render('Quiz/Show', [
            'questions' => $questions,
            'sessionId' => $session->id
        ]);
    }

    public function submit(Request $request)
    {
        $sessionId = $request->session()->get('quiz_session_id');
        if (!$sessionId) return redirect()->route('home');

        $session = QuizSession::findOrFail($sessionId);
        
        if ($session->completed_at) {
            return redirect()->route('quiz.result', ['id' => $session->id]);
        }

        $answers = $request->input('answers', []); // ['question_id' => [answer_ids...]]
        
        $score = 0;
        
        foreach ($answers as $questionId => $answerIds) {
            $question = Question::with('answers')->find($questionId);
            if (!$question) continue;

            if ($question->type === 'scq') {
                $answerId = is_array($answerIds) ? $answerIds[0] : $answerIds;
                $session->userAnswers()->create([
                    'question_id' => $questionId,
                    'answer_id' => $answerId
                ]);
                $isCorrect = $question->answers->where('id', $answerId)->first()?->is_correct;
                if ($isCorrect) $score++;
            } else if ($question->type === 'mcq') {
                $correctAnswerIds = $question->answers->where('is_correct', true)->pluck('id')->toArray();
                $userAnswerIds = is_array($answerIds) ? $answerIds : [];
                
                // Save user answers
                foreach ($userAnswerIds as $answerId) {
                    $session->userAnswers()->create([
                        'question_id' => $questionId,
                        'answer_id' => $answerId
                    ]);
                }
                
                sort($correctAnswerIds);
                sort($userAnswerIds);
                
                if ($correctAnswerIds == $userAnswerIds) {
                    $score++;
                }
            }
        }

        $session->update([
            'score' => $score,
            'completed_at' => now()
        ]);

        $request->session()->forget('quiz_session_id');

        return redirect()->route('quiz.result', ['id' => $session->id]);
    }

    public function result(Request $request, $id)
    {
        $session = QuizSession::with('userAnswers.question.answers', 'userAnswers.answer')->findOrFail($id);
        
        return Inertia::render('Quiz/Result', [
            'session' => $session,
        ]);
    }
}
