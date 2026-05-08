<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Question;

class CategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Categories/Index', [
            'categories' => Category::withCount('questions')->get(),
            'questions' => Question::all(), // We need all questions to handle assignments dynamically
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'duration' => 'required|integer|min:1',
            'question_ids' => 'nullable|array',
            'question_ids.*' => 'exists:questions,id'
        ]);

        $category = Category::create($request->only('name', 'duration'));

        if ($request->has('question_ids')) {
            Question::whereIn('id', $request->question_ids)->update(['category_id' => $category->id]);
        }

        return redirect()->back();
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'duration' => 'required|integer|min:1',
            'question_ids' => 'nullable|array',
            'question_ids.*' => 'exists:questions,id'
        ]);

        $category->update($request->only('name', 'duration'));

        // Reset questions that were in this category but are no longer selected
        Question::where('category_id', $category->id)->update(['category_id' => null]);

        // Assign new questions
        if ($request->has('question_ids')) {
            Question::whereIn('id', $request->question_ids)->update(['category_id' => $category->id]);
        }

        return redirect()->back();
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()->back();
    }
}
