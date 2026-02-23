'use client';

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-12 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6 py-12">
      <div className="flex flex-col items-center gap-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-amber-400 to-teal-400">
          Quit scrolling, start quiz scrolling
        </h2>
        <p className="text-xl text-slate-300">
          Replace your doom scrolling with brain fuel
        </p>
      </div>

      <div className="grid w-full max-w-2xl gap-4 md:gap-6">
        <div className="rounded-lg bg-slate-800/50 p-6 border border-teal-500/20">
          <h3 className="font-semibold text-teal-400 mb-2">Challenge yourself</h3>
          <p className="text-slate-300">Answer multiple choice questions from diverse topics</p>
        </div>
        <div className="rounded-lg bg-slate-800/50 p-6 border border-amber-500/20">
          <h3 className="font-semibold text-amber-400 mb-2">Earn your score</h3>
          <p className="text-slate-300">Track your progress and accuracy</p>
        </div>
        <div className="rounded-lg bg-slate-800/50 p-6 border border-teal-500/20">
          <h3 className="font-semibold text-teal-400 mb-2">End whenever you want</h3>
          <p className="text-slate-300">Get your rewards instantly</p>
        </div>
      </div>

      <button
        onClick={onStart}
        className="rounded-full bg-gradient-to-r from-teal-500 to-teal-600 px-8 py-3 text-lg font-semibold text-white hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-teal-500/50"
      >
        Start Scrolling ↓
      </button>
    </div>
  );
}
