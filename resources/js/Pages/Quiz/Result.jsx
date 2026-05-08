import { Head } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Result({ session, totalQuestions }) {
    const score = session.score;
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
        <>
            <Head title="Quiz Results" />
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
                <div className="max-w-4xl mx-auto">
                    
                    <div className="flex justify-center mb-10">
                        <ApplicationLogo className="w-56 h-auto" />
                    </div>

                    {/* Score Header */}
                    <div className="bg-white rounded-[2rem] shadow-xl p-10 text-center mb-10 relative overflow-hidden border border-gray-100">
                        <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
                        <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Quiz Completed!</h1>
                        <p className="text-slate-500 mb-10 text-lg">Well done, <span className="text-blue-600 font-black uppercase">{session.username}</span>!</p>
                        
                        <div className="inline-flex items-center justify-center w-56 h-56 rounded-full border-[10px] border-gray-50 bg-white shadow-xl mb-8 relative">
                            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="transparent" stroke="#f3f4f6" strokeWidth="10" />
                                <circle cx="50" cy="50" r="45" fill="transparent" stroke="#2563eb" strokeWidth="10" strokeDasharray={`${percentage * 2.82} 282.7`} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                            </svg>
                            <div className="text-center relative z-10">
                                <span className="text-6xl font-black text-blue-600">{score}</span>
                                <span className="text-3xl text-gray-300 font-bold">/{totalQuestions}</span>
                                <div className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">Score</div>
                            </div>
                        </div>
                        <div className="text-2xl text-slate-800 font-black uppercase tracking-wide">
                            {percentage >= 80 ? 'Outstanding! 🏆' : percentage >= 50 ? 'Great Job! 👏' : 'Keep Learning! 📚'}
                        </div>
                    </div>

                    {/* Detailed Review */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4 mb-8 pl-2">
                            <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Review Your Answers</h2>
                        </div>
                        
                        {session.user_answers.map((ua, index) => {
                            const isCorrect = ua.answer.is_correct;
                            return (
                                <div key={ua.id} className={`bg-white rounded-3xl p-8 border ${isCorrect ? 'border-green-100' : 'border-red-100'} shadow-sm transition hover:shadow-md`}>
                                    <div className="flex items-start">
                                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg mr-6 flex-shrink-0 ${isCorrect ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-slate-900 mb-6 leading-snug">{ua.question.text}</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {ua.question.answers.map(ans => {
                                                    const isSelected = ans.id === ua.answer_id;
                                                    const isActuallyCorrect = ans.is_correct;
                                                    
                                                    let classes = "p-4 rounded-2xl border-2 flex justify-between items-center text-sm font-bold transition ";
                                                    if (isSelected && isActuallyCorrect) {
                                                        classes += "bg-green-50 border-green-500 text-green-800";
                                                    } else if (isSelected && !isActuallyCorrect) {
                                                        classes += "bg-red-50 border-red-500 text-red-800";
                                                    } else if (!isSelected && isActuallyCorrect) {
                                                        classes += "bg-green-50 border-green-200 text-green-600 border-dashed";
                                                    } else {
                                                        classes += "bg-gray-50 border-transparent text-gray-400 opacity-60";
                                                    }

                                                    return (
                                                        <div key={ans.id} className={classes}>
                                                            <span>{ans.text}</span>
                                                            {isSelected && isActuallyCorrect && <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                                            {isSelected && !isActuallyCorrect && <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-16 text-center pb-20">
                        <a href={route('home')} className="inline-flex items-center justify-center px-10 py-4 bg-slate-900 hover:bg-black text-white font-black rounded-2xl transition-all shadow-xl hover:-translate-y-1 uppercase tracking-widest text-sm">
                            Try Again
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
