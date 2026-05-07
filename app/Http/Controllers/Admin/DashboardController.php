<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\QuizSession;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'totalQuestions' => Question::count(),
            'totalSessions' => QuizSession::count(),
            'averageScore' => QuizSession::avg('score') ?? 0,
            'recentSessions' => QuizSession::latest()->take(5)->get()
        ]);
    }
}
