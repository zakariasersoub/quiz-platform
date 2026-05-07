import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function QuestionsIndex({ auth, questions }) {
    const [isCreating, setIsCreating] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        text: '',
        type: 'scq',
        answers: [
            { text: '', is_correct: false },
            { text: '', is_correct: false },
        ]
    });

    const handleCreateNew = () => {
        setEditingQuestion(null);
        setIsCreating(true);
        reset();
    };

    const handleEdit = (question) => {
        setEditingQuestion(question);
        setIsCreating(true);
        setData({
            text: question.text,
            type: question.type,
            answers: question.answers.map(a => ({
                id: a.id,
                text: a.text,
                is_correct: a.is_correct === 1 || a.is_correct === true
            }))
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const addAnswerField = () => {
        setData('answers', [...data.answers, { text: '', is_correct: false }]);
    };

    const removeAnswerField = (index) => {
        if (data.answers.length <= 2) return;
        const newAnswers = [...data.answers];
        newAnswers.splice(index, 1);
        setData('answers', newAnswers);
    };

    const updateAnswer = (index, field, value) => {
        const newAnswers = [...data.answers];
        
        if (field === 'is_correct' && data.type === 'scq') {
            // For Single Choice, only one can be correct
            newAnswers.forEach(ans => ans.is_correct = false);
        }
        
        newAnswers[index][field] = value;
        setData('answers', newAnswers);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingQuestion) {
            put(route('admin.questions.update', editingQuestion.id), {
                onSuccess: () => {
                    setIsCreating(false);
                    setEditingQuestion(null);
                    reset();
                }
            });
        } else {
            post(route('admin.questions.store'), {
                onSuccess: () => {
                    setIsCreating(false);
                    reset();
                }
            });
        }
    };

    const handleDelete = (id) => {
        console.log('Executing delete for ID:', id);
        router.delete(route('admin.questions.destroy', id), {
            preserveScroll: true,
            onStart: () => console.log('Delete request started'),
            onSuccess: () => {
                console.log('Delete success');
                setConfirmDelete(null);
            },
            onError: (err) => {
                console.error('Delete error:', err);
                alert('Failed to delete: ' + JSON.stringify(err));
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Questions</h2>}
        >
            <Head title="Manage Questions" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {!isCreating && (
                        <div className="mb-6 flex justify-end">
                            <button 
                                onClick={handleCreateNew}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg transition transform hover:scale-105"
                            >
                                + Create New Question
                            </button>
                        </div>
                    )}

                    {isCreating && (
                        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg mb-8 border border-gray-100">
                            <div className="p-6 text-gray-900">
                                <h3 className="text-xl font-bold mb-6 text-gray-800">{editingQuestion ? 'Edit Question' : 'Create Question'}</h3>
                                <form onSubmit={submit}>
                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">Question Text</label>
                                        <textarea
                                            value={data.text}
                                            onChange={e => setData('text', e.target.value)}
                                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 transition"
                                            rows="3"
                                            placeholder="Enter your question here..."
                                            required
                                        ></textarea>
                                        {errors.text && <p className="text-red-500 text-xs mt-2 font-medium">{errors.text}</p>}
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">Question Type</label>
                                        <select
                                            value={data.type}
                                            onChange={e => setData('type', e.target.value)}
                                            className="w-full sm:w-64 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 transition"
                                        >
                                            <option value="scq">Single Choice (SCQ)</option>
                                            <option value="mcq">Multiple Choice (MCQ)</option>
                                        </select>
                                    </div>

                                    <div className="mb-8">
                                        <label className="block text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">Answers</label>
                                        <div className="space-y-3">
                                            {data.answers.map((answer, index) => (
                                                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100 transition hover:bg-gray-100">
                                                    <input
                                                        type={data.type === 'scq' ? 'radio' : 'checkbox'}
                                                        name="is_correct"
                                                        checked={answer.is_correct}
                                                        onChange={e => updateAnswer(index, 'is_correct', e.target.checked)}
                                                        className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={answer.text}
                                                        onChange={e => updateAnswer(index, 'text', e.target.value)}
                                                        className="flex-1 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                                        placeholder={`Option ${index + 1}`}
                                                        required
                                                    />
                                                    {data.answers.length > 2 && (
                                                        <button type="button" onClick={() => removeAnswerField(index)} className="text-red-400 hover:text-red-600 transition p-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <button type="button" onClick={addAnswerField} className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-bold transition">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                            </svg>
                                            Add another option
                                        </button>
                                        {errors.answers && <p className="text-red-500 text-xs mt-2 font-medium">{errors.answers}</p>}
                                    </div>

                                    <div className="flex space-x-4 pt-4 border-t border-gray-100">
                                        <button disabled={processing} type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-6 rounded-lg shadow transition transform hover:scale-105 active:scale-95 disabled:opacity-50">
                                            {editingQuestion ? 'Update Question' : 'Save Question'}
                                        </button>
                                        <button type="button" onClick={() => { setIsCreating(false); setEditingQuestion(null); }} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 px-6 rounded-lg transition">
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-xl border border-gray-100">
                        <div className="p-6 text-gray-900 space-y-6">
                            <h3 className="text-xl font-bold text-gray-800 border-b pb-4">Questions Bank ({questions.length})</h3>
                            {questions.map((q, i) => (
                                <div key={q.id} className="group bg-white border border-gray-200 rounded-xl p-5 transition hover:shadow-md hover:border-blue-200">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-3">
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black tracking-widest uppercase ${q.type === 'mcq' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                                    {q.type}
                                                </span>
                                                <h4 className="font-bold text-gray-800 text-lg leading-tight">{q.text}</h4>
                                            </div>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-2">
                                                {q.answers.map(a => (
                                                    <li key={a.id} className={`flex items-center text-sm p-2 rounded-lg ${a.is_correct ? 'bg-green-50 text-green-700 border border-green-100' : 'text-gray-500 bg-gray-50 border border-gray-100'}`}>
                                                        <span className={`w-2 h-2 rounded-full mr-2 ${a.is_correct ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                                        {a.text}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
                                            {confirmDelete === q.id ? (
                                                <div className="flex items-center bg-red-50 p-1 rounded-lg border border-red-200 animate-pulse">
                                                    <button 
                                                        onClick={() => handleDelete(q.id)}
                                                        className="bg-red-600 text-white text-xs px-3 py-1.5 rounded-md font-bold hover:bg-red-700 transition mr-1 shadow-sm"
                                                    >
                                                        Confirm
                                                    </button>
                                                    <button 
                                                        onClick={() => setConfirmDelete(null)}
                                                        className="text-gray-500 text-xs px-3 py-1.5 rounded-md font-bold hover:bg-gray-200 transition"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <button 
                                                        onClick={() => handleEdit(q)} 
                                                        className="w-full sm:w-auto bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-bold text-sm transition shadow-sm flex items-center justify-center"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                        </svg>
                                                        Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => setConfirmDelete(q.id)} 
                                                        className="w-full sm:w-auto bg-white border border-red-100 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg font-bold text-sm transition flex items-center justify-center"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {questions.length === 0 && (
                                <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-gray-500 font-medium">No questions created yet. Start by clicking "Create New Question".</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
