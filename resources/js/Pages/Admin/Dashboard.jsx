import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, totalQuestions, totalSessions, averageScore, recentSessions }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-blue-500">
                            <div className="text-sm font-medium text-gray-500 truncate">Total Questions</div>
                            <div className="mt-1 text-3xl font-semibold text-gray-900">{totalQuestions}</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-purple-500">
                            <div className="text-sm font-medium text-gray-500 truncate">Total Quiz Sessions</div>
                            <div className="mt-1 text-3xl font-semibold text-gray-900">{totalSessions}</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-green-500">
                            <div className="text-sm font-medium text-gray-500 truncate">Average Score</div>
                            <div className="mt-1 text-3xl font-semibold text-gray-900">{parseFloat(averageScore).toFixed(1)}</div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                            <div className="flex space-x-4">
                                <Link href={route('admin.questions.index')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
                                    Manage Questions
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-bold mb-4">Recent Attempts</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {recentSessions.map((session) => (
                                            <tr key={session.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{session.username}</td>
                                                <td className="px-6 py-4 whitespace-nowrap font-semibold">{session.score}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(session.created_at).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                        {recentSessions.length === 0 && (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No sessions yet.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
