import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';

export default function Index({ auth, categories, questions }) {
    const formRef = useRef(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [showAvailableQuestions, setShowAvailableQuestions] = useState(false);

    const { data, setData, post, put, delete: destroy, processing, reset } = useForm({
        name: '',
        duration: 10,
        question_ids: [],
    });

    const submit = (e) => {
        e.preventDefault();
        const action = editingCategory 
            ? route('admin.categories.update', editingCategory.id) 
            : route('admin.categories.store');
            
        const method = editingCategory ? put : post;

        method(action, {
            onSuccess: () => {
                setIsFormVisible(false);
                setEditingCategory(null);
                reset();
            }
        });
    };

    const startAdd = () => {
        setEditingCategory(null);
        setIsFormVisible(true);
        reset();
        setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    const startEdit = (cat) => {
        setEditingCategory(cat);
        setIsFormVisible(true);
        setShowAvailableQuestions(false);
        const catQuestions = questions.filter(q => q.category_id === cat.id).map(q => q.id);
        setData({
            name: cat.name,
            duration: cat.duration,
            question_ids: catQuestions,
        });
        setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    const toggleQuestion = (id) => {
        const ids = [...data.question_ids];
        if (ids.includes(id)) {
            setData('question_ids', ids.filter(qId => qId !== id));
        } else {
            setData('question_ids', [...ids, id]);
        }
    };

    // Filter questions: Assigned to current category vs Available (no category)
    const currentCatQuestions = questions.filter(q => data.question_ids.includes(q.id));
    const availableQuestions = questions.filter(q => !q.category_id && !data.question_ids.includes(q.id));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories Management</h2>}
        >
            <Head title="Manage Categories" />

            <div className="py-12 font-sans bg-gray-50/50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-10">
                    
                    {/* List Section */}
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-[2.5rem] border border-gray-100">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Active Categories</h3>
                                    <p className="text-slate-400 text-sm font-medium">Manage your quiz topics and their timing.</p>
                                </div>
                                <div className="bg-blue-50 px-4 py-2 rounded-2xl">
                                    <span className="text-blue-600 font-black text-lg">{categories.length}</span>
                                    <span className="text-blue-400 text-xs font-bold uppercase ml-2 tracking-widest">Total</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categories.map((cat) => (
                                    <div key={cat.id} className="group bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-2 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="text-lg font-black text-slate-800">{cat.name}</h4>
                                            <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-tighter">ID: {cat.id}</span>
                                        </div>
                                        <div className="flex items-center space-x-4 mb-6">
                                            <div className="flex flex-col">
                                                <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Questions</span>
                                                <span className="text-slate-700 font-bold">{cat.questions_count}</span>
                                            </div>
                                            <div className="w-px h-8 bg-gray-100"></div>
                                            <div className="flex flex-col">
                                                <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Time</span>
                                                <span className="text-blue-600 font-black">{cat.duration}m</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => startEdit(cat)} className="flex-1 py-2 bg-slate-900 text-white text-xs font-black rounded-xl hover:bg-black transition uppercase tracking-widest">Edit</button>
                                            <button onClick={() => { if(confirm('Delete?')) router.delete(route('admin.categories.destroy', cat.id)) }} className="px-4 py-2 bg-red-50 text-red-600 text-xs font-black rounded-xl hover:bg-red-100 transition uppercase tracking-widest">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button 
                                onClick={startAdd}
                                className="mt-10 w-full py-5 border-2 border-dashed border-gray-200 rounded-[2rem] text-slate-400 font-black uppercase tracking-widest hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 group-hover:scale-125 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                </svg>
                                Add New Category
                            </button>
                        </div>
                    </div>

                    {/* Form Section */}
                    {isFormVisible && (
                        <div ref={formRef} className="bg-white overflow-hidden shadow-2xl sm:rounded-[2.5rem] border-2 border-blue-100 animate-in fade-in slide-in-from-bottom-10 duration-700">
                            <div className="p-10">
                                <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-50">
                                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                                        {editingCategory ? `Edit: ${editingCategory.name}` : 'Create New Category'}
                                    </h3>
                                    <button onClick={() => setIsFormVisible(false)} className="p-3 bg-gray-50 rounded-2xl text-slate-400 hover:text-slate-600 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <form onSubmit={submit} className="space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Category Name</label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                placeholder="e.g. Advanced Cybersecurity"
                                                className="w-full px-6 py-4 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-800"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Quiz Duration (Minutes)</label>
                                            <input
                                                type="number"
                                                value={data.duration}
                                                onChange={e => setData('duration', e.target.value)}
                                                className="w-full px-6 py-4 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-black text-blue-600 text-xl"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Questions Management */}
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-end">
                                            <h4 className="text-lg font-black text-slate-800 flex items-center">
                                                <span className="w-2 h-6 bg-blue-500 rounded-full mr-3"></span>
                                                Assigned Questions ({currentCatQuestions.length})
                                            </h4>
                                            <button 
                                                type="button"
                                                onClick={() => setShowAvailableQuestions(!showAvailableQuestions)}
                                                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${showAvailableQuestions ? 'bg-amber-100 text-amber-700' : 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'}`}
                                            >
                                                {showAvailableQuestions ? 'Close Questions List' : 'Add More Questions'}
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {currentCatQuestions.map(q => (
                                                <div key={q.id} className="flex items-center justify-between p-5 bg-blue-50/50 border border-blue-100 rounded-2xl group transition hover:bg-blue-50">
                                                    <span className="text-sm font-bold text-slate-700 pr-4">{q.text}</span>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => toggleQuestion(q.id)}
                                                        className="p-2 bg-white rounded-lg text-red-400 hover:text-red-600 hover:shadow-sm transition"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                            {currentCatQuestions.length === 0 && !showAvailableQuestions && (
                                                <div className="col-span-full py-8 text-center text-slate-400 font-bold italic border-2 border-dashed border-gray-100 rounded-3xl">
                                                    No questions assigned to this category yet.
                                                </div>
                                            )}
                                        </div>

                                        {/* Available Questions Drawer */}
                                        {showAvailableQuestions && (
                                            <div className="mt-8 p-8 bg-slate-900 rounded-[2rem] text-white animate-in zoom-in-95 duration-300">
                                                <h5 className="text-sm font-black uppercase tracking-[0.2em] text-blue-400 mb-6">Available Questions (Unassigned)</h5>
                                                <div className="space-y-3 max-h-80 overflow-y-auto pr-4 custom-scrollbar">
                                                    {availableQuestions.map(q => (
                                                        <div 
                                                            key={q.id} 
                                                            onClick={() => toggleQuestion(q.id)}
                                                            className="flex items-center p-4 rounded-xl bg-slate-800 border border-slate-700 cursor-pointer hover:bg-slate-700 hover:border-blue-500 transition-all group"
                                                        >
                                                            <div className="w-6 h-6 rounded-lg border-2 border-slate-600 mr-4 flex items-center justify-center group-hover:border-blue-500">
                                                                <div className="w-2 h-2 bg-blue-500 rounded-sm opacity-0 group-hover:opacity-100"></div>
                                                            </div>
                                                            <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{q.text}</span>
                                                        </div>
                                                    ))}
                                                    {availableQuestions.length === 0 && (
                                                        <div className="py-10 text-center text-slate-500 font-black uppercase tracking-widest text-xs">
                                                            All questions are already assigned!
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-10 flex gap-4 border-t border-gray-50">
                                        <button 
                                            type="submit" 
                                            disabled={processing} 
                                            className="flex-1 py-5 bg-blue-600 text-white font-black rounded-[1.5rem] shadow-xl shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 uppercase tracking-[0.2em] text-sm disabled:opacity-50"
                                        >
                                            {processing ? 'Processing...' : (editingCategory ? 'Save Changes' : 'Create Category')}
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => { setIsFormVisible(false); setEditingCategory(null); reset(); }} 
                                            className="px-10 py-5 bg-gray-100 text-slate-500 font-black rounded-[1.5rem] hover:bg-gray-200 transition-all uppercase tracking-widest text-sm"
                                        >
                                            Discard
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
            `}} />
        </AuthenticatedLayout>
    );
}
