<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\QuizSession;
use App\Models\Category;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            'categories' => Category::all(),
            'canLogin' => \Illuminate\Support\Facades\Route::has('login'),
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    public function start(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255',
            'category_id' => 'nullable|exists:categories,id'
        ]);

        $session = QuizSession::create([
            'username' => $request->username,
            'user_id' => auth()->id(),
            'category_id' => $request->category_id,
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

        $session = QuizSession::with('category')->findOrFail($sessionId);

        if ($session->completed_at) {
            return redirect()->route('quiz.result', ['id' => $session->id]);
        }

        $numQuestions = Setting::where('key', 'questions_per_session')->value('value') ?? 10;

        $query = Question::with('answers')->inRandomOrder();
        
        if ($session->category_id) {
            $query->where('category_id', $session->category_id);
        }

        $questions = $query->limit((int) $numQuestions)->get();

        // If not enough questions in category, get from any
        if ($questions->count() < 1 && $session->category_id) {
             $questions = Question::with('answers')->inRandomOrder()->limit((int) $numQuestions)->get();
        }

        return Inertia::render('Quiz/Show', [
            'questions' => $questions,
            'sessionId' => $session->id,
            'duration' => $session->category?->duration ?? 10, // minutes
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

        $answers = $request->input('answers', []); 
        $questionIds = $request->input('question_ids', []); // Total questions in the quiz
        
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
                
                foreach ($userAnswerIds as $answerId) {
                    $session->userAnswers()->create([
                        'question_id' => $questionId,
                        'answer_id' => $answerId
                    ]);
                }
                
                sort($correctAnswerIds);
                sort($userAnswerIds);
                
                if ($correctAnswerIds == $userAnswerIds && count($correctAnswerIds) > 0) {
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
        $session = QuizSession::with(['userAnswers.question.answers', 'userAnswers.answer', 'category'])->findOrFail($id);
        
        // Total questions can be derived from settings or the actual session if tracked
        $totalQuestions = Setting::where('key', 'questions_per_session')->value('value') ?? 10;

        return Inertia::render('Quiz/Result', [
            'session' => $session,
            'totalQuestions' => (int) $totalQuestions
        ]);
    }

    public function attempts(Request $request)
    {
        $query = QuizSession::with('category')->orderBy('created_at', 'desc');

        if ($request->has('username')) {
            $query->where('username', 'like', '%' . $request->username . '%');
        }

        return Inertia::render('Quiz/Attempts', [
            'attempts' => $query->get(),
            'filters' => $request->only(['username'])
        ]);
    }

    public function destroyAttempt($id)
    {
        $session = QuizSession::findOrFail($id);
        $session->delete();

        return redirect()->back();
    }
}
