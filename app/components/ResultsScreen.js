'use client';

export default function ResultsScreen({ stats, onRestart }) {
  const accuracy = stats.total > 0 ? ((stats.correct / stats.total) * 100).toFixed(0) : 0;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6 py-12">
      {/* Score Circle */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-teal-600 shadow-2xl">
          <div className="text-5xl font-bold text-white">{stats.correct}</div>
          <span className="absolute right-4 bottom-4 text-2xl text-teal-100">
            /{stats.total}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-white">Great Job!</h1>
      </div>

      {/* Stats Grid */}
      <div className="w-full max-w-lg space-y-4 rounded-2xl bg-slate-800 p-8 border border-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-slate-300">Accuracy</span>
          <span className="text-2xl font-bold text-teal-400">{accuracy}%</span>
        </div>

        <div className="h-2 w-full rounded-full bg-slate-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-500"
            style={{ width: `${accuracy}%` }}
          />
        </div>

        <div className="pt-4 space-y-2 border-t border-slate-700">
          <div className="flex items-center justify-between text-slate-300">
            <span>Correct Answers</span>
            <span className="font-semibold text-teal-400">{stats.correct}</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>Incorrect Answers</span>
            <span className="font-semibold text-red-400">{stats.incorrect}</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>Questions Answered</span>
            <span className="font-semibold text-slate-200">{stats.total}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex w-full max-w-lg gap-4">
        <button
          onClick={onRestart}
          className="flex-1 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-3 font-semibold text-white hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-teal-500/50"
        >
          Try Again
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="flex-1 rounded-full border-2 border-slate-600 px-6 py-3 font-semibold text-slate-300 hover:bg-slate-800 transition-all duration-200"
        >
          Home
        </button>
      </div>
    </div>
  );
}
