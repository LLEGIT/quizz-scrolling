'use client';

export default function ResultsScreen({ stats, onRestart }) {
  const accuracy = stats.total > 0 ? ((stats.correct / stats.total) * 100).toFixed(1) : 0;
  const accuracyNum = Number(accuracy);
  
  // Determine performance level
  let performanceLevel = 'great'; // 75%+
  let titleText = 'Great Job!';
  let titleColor = 'text-teal-400';
  let circleGradient = 'from-teal-500 to-teal-600';
  let accentColor = 'text-teal-400';
  let messageText = 'You nailed it! Keep up the momentum!';
  
  if (accuracyNum < 50) {
    performanceLevel = 'bad';
    titleText = 'Too Bad!';
    titleColor = 'text-red-400';
    circleGradient = 'from-red-500 to-red-600';
    accentColor = 'text-red-400';
    messageText = 'You didn\'t make it this time. Try again!';
  } else if (accuracyNum < 75) {
    performanceLevel = 'medium';
    titleText = 'Not Bad!';
    titleColor = 'text-amber-400';
    circleGradient = 'from-amber-500 to-amber-600';
    accentColor = 'text-amber-400';
    messageText = 'Good effort! Keep practicing to improve.';
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6 py-12">
      {/* Score Circle */}
      <div className="flex flex-col items-center gap-4">
        <div className={`relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-r ${circleGradient} shadow-2xl`}>
          <div className="text-5xl font-bold text-white">{stats.correct}</div>
        </div>
        <div className="text-center">
          <h1 className={`text-3xl font-bold ${titleColor}`}>{titleText}</h1>
          <p className="text-slate-400 mt-2">{messageText}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="w-full max-w-lg space-y-4 rounded-2xl bg-slate-800 p-8 border border-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-slate-300">Accuracy</span>
          <span className={`text-2xl font-bold ${accentColor}`}>{accuracy}%</span>
        </div>

        <div className="h-2 w-full rounded-full bg-slate-700">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${circleGradient} transition-all duration-500`}
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
            <span>Total Questions</span>
            <span className="font-semibold text-slate-200">{stats.total}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex w-full max-w-lg gap-4">
        <button
          onClick={onRestart}
          className={`flex-1 rounded-full bg-gradient-to-r ${circleGradient} px-6 py-3 font-semibold text-white hover:shadow-lg transition-all duration-200`}
          style={{
            boxShadow: performanceLevel === 'bad' ? 'rgba(239, 68, 68, 0.5) 0 0 20px' : 
                       performanceLevel === 'medium' ? 'rgba(245, 158, 11, 0.5) 0 0 20px' : 
                       'rgba(20, 184, 166, 0.5) 0 0 20px'
          }}
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
