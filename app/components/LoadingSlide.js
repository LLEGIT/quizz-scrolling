'use client';

export default function LoadingSlide() {
  return (
    <div className="fixed top-20 left-0 right-0 bottom-0 w-full flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full border-4 border-slate-700 border-t-teal-500 animate-spin" />
        </div>
        <p className="text-lg font-medium text-slate-300">Loading next question...</p>
      </div>
    </div>
  );
}
