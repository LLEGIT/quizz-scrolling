'use client';

export default function SessionHUD({ stats, onEnd }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-gradient-to-b from-slate-900 to-slate-900/50 px-6 py-4 backdrop-blur-sm border-b border-slate-700/50">
      <div className="flex items-center gap-8">
        <div className="flex flex-col gap-1">
          <p className="text-xs uppercase tracking-widest text-slate-500">Score</p>
          <p className="text-2xl font-bold text-teal-400">{stats.correct}/{stats.total}</p>
        </div>
        {stats.total > 0 && (
          <div className="flex flex-col gap-1">
            <p className="text-xs uppercase tracking-widest text-slate-500">Accuracy</p>
            <p className="text-2xl font-bold text-amber-400">
              {((stats.correct / stats.total) * 100).toFixed(0)}%
            </p>
          </div>
        )}
      </div>

      <button
        onClick={onEnd}
        className="rounded-full bg-gradient-to-r from-red-500 to-red-600 px-6 py-2 font-semibold text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 text-sm"
      >
        End
      </button>
    </div>
  );
}
