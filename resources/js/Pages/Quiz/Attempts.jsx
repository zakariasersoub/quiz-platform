import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Attempts({ auth, attempts, filters }) {
    const [search, setSearch] = useState(filters.username || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.attempts.index'), { username: search }, { preserveState: true });
    };

    const deleteAttempt = (id) => {
        if (confirm('Are you sure you want to delete this attempt?')) {
            router.delete(route('admin.attempts.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Quiz Attempts</h2>}
        >
            <Head title="Quiz Attempts" />

            <div className="py-12 font-sans">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-3xl border border-gray-100 mb-8 p-6">
                        <form onSubmit={handleSearch} className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Search by username..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-1 rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                            />
                            <button type="submit" className="px-8 py-2 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition">
                                Filter
                            </button>
                        </form>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-3xl border border-gray-100">
                        <div className="p-6 text-gray-900">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 uppercase text-xs font-black tracking-widest text-slate-500">
                                        <th className="px-6 py-4 rounded-tl-2xl">Username</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Score</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4 rounded-tr-2xl text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {attempts.map((attempt) => (
                                        <tr key={attempt.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-slate-900">{attempt.username}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-black rounded-full uppercase tracking-tighter">
                                                    {attempt.category?.name || 'General'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <span className="font-black text-lg text-blue-600">{attempt.score}</span>
                                                    <span className="text-slate-300 text-sm ml-1 font-bold">/ 10</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 text-sm font-medium">
                                                {new Date(attempt.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={route('quiz.result', attempt.id)}
                                                    className="text-blue-600 hover:text-blue-900 font-black mr-4 text-xs uppercase tracking-widest"
                                                >
                                                    View Result
                                                </Link>
                                                <button
                                                    onClick={() => deleteAttempt(attempt.id)}
                                                    className="text-red-600 hover:text-red-900 font-black text-xs uppercase tracking-widest"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {attempts.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-slate-400 font-bold italic">No attempts found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
