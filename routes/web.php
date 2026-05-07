<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [App\Http\Controllers\QuizController::class, 'index'])->name('home');
Route::post('/quiz/start', [App\Http\Controllers\QuizController::class, 'start'])->name('quiz.start');
Route::get('/quiz', [App\Http\Controllers\QuizController::class, 'show'])->name('quiz.show');
Route::post('/quiz/submit', [App\Http\Controllers\QuizController::class, 'submit'])->name('quiz.submit');
Route::get('/quiz/result/{id}', [App\Http\Controllers\QuizController::class, 'result'])->name('quiz.result');

Route::get('/dashboard', function () {
    return redirect()->route('admin.dashboard');
})->middleware(['auth'])->name('dashboard');

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    Route::resource('categories', App\Http\Controllers\Admin\CategoryController::class);
    Route::resource('questions', App\Http\Controllers\Admin\QuestionController::class);
    Route::resource('settings', App\Http\Controllers\Admin\SettingController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
