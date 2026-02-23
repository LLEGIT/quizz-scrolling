'use client';

export default function QuestionCard({ question, onAnswer, isAnswered, isLocked }) {
  const isCorrect = isAnswered && isAnswered.isCorrect;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 bg-gradient-to-b from-slate-900 to-slate-950 px-6 py-12 h-full">
      <div className="w-full max-w-lg rounded-2xl bg-slate-800 p-8 shadow-2xl border border-slate-700">
        {/* Difficulty Badge */}
        <div className="mb-6 flex items-center justify-between">
          <span className="inline-block rounded-full bg-slate-700 px-3 py-1 text-sm font-medium text-slate-300">
            {question.difficulty.toUpperCase()}
          </span>
          {isAnswered && (
            <span
              className={`text-sm font-semibold ${
                isCorrect ? 'text-teal-400' : 'text-red-400'
              }`}
            >
              {isCorrect ? '✓ Correct' : '✗ Incorrect'}
            </span>
          )}
        </div>

        {/* Question */}
        <h2 className="mb-8 text-2xl font-bold text-white">
          {question.question}
        </h2>

        {/* Answers Grid */}
        <div className="space-y-3">
          {question.allAnswers.map((answer, index) => (
            <button
              key={index}
              onClick={() => !isAnswered && !isLocked && onAnswer(answer)}
              disabled={isAnswered || isLocked}
              className={`w-full rounded-lg p-4 text-left font-medium transition-all duration-200 ${
                isAnswered && answer === question.correctAnswer
                  ? 'bg-teal-500 text-white'
                  : isAnswered && answer === isAnswered.answer
                  ? answer === question.correctAnswer
                    ? 'bg-teal-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-slate-700 text-slate-100 hover:bg-slate-600'
              } ${isAnswered || isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
