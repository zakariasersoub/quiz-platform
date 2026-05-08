import { Head, useForm, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome({ auth, categories, uncategorizedCount }) {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        category_id: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('quiz.start'));
    };

    return (
        <>
            <Head title="Welcome to Quiz Platform" />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 border border-gray-100 transform transition-all hover:shadow-2xl duration-300">
                    <div className="text-center mb-10 flex flex-col items-center">
                        <ApplicationLogo className="w-48 h-auto mb-6" />
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Test Your Knowledge</h1>
                        <p className="text-slate-600 mt-2">Enter your name and pick a category.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider">Username</label>
                            <input
                                id="username"
                                type="text"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                                placeholder="e.g zaki ser"
                                required
                            />
                            {errors.username && <div className="text-red-500 text-sm mt-1 font-medium">{errors.username}</div>}
                        </div>

                        <div>
                            <label htmlFor="category_id" className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider">Category</label>
                            <select
                                id="category_id"
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                                required
                            >
                                <option value="">Select a category</option>
                                {uncategorizedCount > 0 && (
                                    <option value="general">General (Mixed Topics)</option>
                                )}
                                {categories && categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            {errors.category_id && <div className="text-red-500 text-sm mt-1 font-medium">{errors.category_id}</div>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {processing ? 'Loading...' : 'Start Quiz Now'}
                        </button>
                    </form>
                </div>
                
                <div className="mt-8 text-slate-500 text-sm flex flex-col items-center">
                    {auth.user ? (
                        <Link href={route('admin.dashboard')} className="text-blue-600 hover:text-blue-800 font-bold transition-colors">
                            Logged in as {auth.user.name} - Go to Dashboard
                        </Link>
                    ) : (
                        <Link href={route('login')} className="text-slate-500 hover:text-slate-800 transition-colors flex items-center font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            Admin Login
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}
