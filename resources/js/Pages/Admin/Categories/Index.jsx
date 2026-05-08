import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, categories }) {
    const [editingCategory, setEditingCategory] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, reset } = useForm({
        name: '',
        duration: 10,
    });

    const submit = (e) => {
        e.preventDefault();
        if (editingCategory) {
            put(route('admin.categories.update', editingCategory.id), {
                onSuccess: () => {
                    setEditingCategory(null);
                    reset();
                }
            });
        } else {
            post(route('admin.categories.store'), {
                onSuccess: () => reset()
            });
        }
    };

    const startEdit = (cat) => {
        setEditingCategory(cat);
        setData({
            name: cat.name,
            duration: cat.duration,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Categories</h2>}
        >
            <Head title="Categories" />

            <div className="py-12 font-sans">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Form Card */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight">
                            {editingCategory ? 'Edit Category' : 'Create New Category'}
                        </h3>
                        <form onSubmit={submit} className="flex flex-wrap gap-4 items-end">
                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Category Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full rounded-2xl border-gray-100 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                    required
                                />
                            </div>
                            <div className="w-32">
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Time (Min)</label>
                                <input
                                    type="number"
                                    value={data.duration}
                                    onChange={e => setData('duration', e.target.value)}
                                    className="w-full rounded-2xl border-gray-100 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                    required
                                />
                            </div>
                            <div className="flex gap-2">
                                <button type="submit" disabled={processing} className="px-8 py-2 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition">
                                    {editingCategory ? 'Update' : 'Create'}
                                </button>
                                {editingCategory && (
                                    <button type="button" onClick={() => { setEditingCategory(null); reset(); }} className="px-8 py-2 bg-gray-100 text-slate-600 font-bold rounded-2xl hover:bg-gray-200 transition">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Table Card */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-3xl border border-gray-100">
                        <div className="p-6 text-gray-900">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 uppercase text-xs font-black tracking-widest text-slate-500">
                                        <th className="px-6 py-4 rounded-tl-2xl">Name</th>
                                        <th className="px-6 py-4">Quiz Duration</th>
                                        <th className="px-6 py-4 rounded-tr-2xl text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {categories.map((cat) => (
                                        <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-slate-900">{cat.name}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-4 py-1 bg-blue-50 text-blue-600 font-black rounded-full text-sm">
                                                    {cat.duration} Minutes
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => startEdit(cat)}
                                                    className="text-blue-600 hover:text-blue-900 font-black mr-4 text-xs uppercase tracking-widest"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => destroy(route('admin.categories.destroy', cat.id))}
                                                    className="text-red-600 hover:text-red-900 font-black text-xs uppercase tracking-widest"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
