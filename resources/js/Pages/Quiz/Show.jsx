import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Show({ questions, sessionId }) {
    const { data, setData, post, processing } = useForm({
        answers: {},
    });

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const question = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handleAnswerSelection = (answerId) => {
        const currentAnswers = data.answers[question.id] || [];
        
        if (question.type === 'scq') {
            setData('answers', {
                ...data.answers,
                [question.id]: [answerId]
            });
        } else {
            // mcq logic
            if (currentAnswers.includes(answerId)) {
                setData('answers', {
                    ...data.answers,
                    [question.id]: currentAnswers.filter(id => id !== answerId)
                });
            } else {
                setData('answers', {
                    ...data.answers,
                    [question.id]: [...currentAnswers, answerId]
                });
            }
        }
    };

    const isSelected = (answerId) => {
        const currentAnswers = data.answers[question?.id] || [];
        return currentAnswers.includes(answerId);
    };

    const submitQuiz = () => {
        post(route('quiz.submit'));
    };

    if (!questions || questions.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 text-slate-800 font-sans">
                <div className="text-center bg-white p-12 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center">
                    <ApplicationLogo className="w-48 h-auto mb-8" />
                    <h2 className="text-2xl font-bold mb-4">No questions available.</h2>
                    <a href={route('home')} className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20">Go Back Home</a>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head title={`Question ${currentQuestionIndex + 1}`} />
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
                <div className="max-w-3xl mx-auto">
                    
                    <div className="flex justify-center mb-10">
                        <ApplicationLogo className="w-56 h-auto" />
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between text-sm text-slate-500 mb-3 font-bold uppercase tracking-wider">
                            <span>Question {currentQuestionIndex + 1} / {questions.length}</span>
                            <span className="text-blue-600">{Math.round(((currentQuestionIndex) / questions.length) * 100)}% Complete</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3">
                            <div className="bg-blue-600 h-3 rounded-full transition-all duration-700 ease-out shadow-sm" style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}></div>
                        </div>
                    </div>

                    {/* Question Card */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="p-10">
                            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-blue-50 text-blue-700 mb-8 border border-blue-100">
                                {question.type === 'scq' ? 'Single Choice' : 'Multiple Choice'}
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-10 leading-tight">
                                {question.text}
                            </h2>

                            <div className="space-y-4">
                                {question.answers.map(answer => (
                                    <button
                                        key={answer.id}
                                        onClick={() => handleAnswerSelection(answer.id)}
                                        className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 flex items-center group ${
                                            isSelected(answer.id)
                                                ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-md transform scale-[1.02]'
                                                : 'bg-white border-gray-100 text-slate-600 hover:bg-gray-50 hover:border-blue-200 hover:text-slate-900'
                                        }`}
                                    >
                                        <div className={`w-6 h-6 rounded-${question.type === 'scq' ? 'full' : 'lg'} border-2 flex items-center justify-center mr-5 flex-shrink-0 transition-all ${
                                            isSelected(answer.id) ? 'border-blue-600 bg-blue-600 shadow-sm' : 'border-gray-200 bg-white group-hover:border-blue-400'
                                        }`}>
                                            {isSelected(answer.id) && (
                                                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-lg font-bold">{answer.text}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Footer Controls */}
                        <div className="bg-gray-50 px-10 py-6 border-t border-gray-100 flex justify-between items-center">
                            <button
                                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                                disabled={currentQuestionIndex === 0}
                                className="px-6 py-3 rounded-xl text-slate-500 font-bold hover:text-slate-800 hover:bg-white hover:shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                ← Previous
                            </button>
                            
                            {isLastQuestion ? (
                                <button
                                    onClick={submitQuiz}
                                    disabled={processing}
                                    className="px-10 py-3 bg-green-600 hover:bg-green-700 text-white font-black rounded-xl shadow-lg shadow-green-500/20 transition-all transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 flex items-center uppercase tracking-widest text-sm"
                                >
                                    {processing ? 'Submitting...' : 'Finish Quiz'}
                                </button>
                            ) : (
                                <button
                                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                                    className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center uppercase tracking-widest text-sm"
                                >
                                    Next →
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
