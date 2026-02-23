'use client';

import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import ScrollFeed from './components/ScrollFeed';
import ResultsScreen from './components/ResultsScreen';

export default function Home() {
  const [state, setState] = useState('welcome'); // 'welcome', 'scrolling', 'results'
  const [stats, setStats] = useState(null);

  const handleStart = () => {
    setState('scrolling');
  };

  const handleSessionEnd = (finalStats) => {
    setStats(finalStats);
    setState('results');
  };

  const handleRestart = () => {
    setState('welcome');
    setStats(null);
  };

  return (
    <main>
      {state === 'welcome' && (
        <WelcomeScreen onStart={handleStart} />
      )}
      {state === 'scrolling' && (
        <ScrollFeed onSessionEnd={handleSessionEnd} />
      )}
      {state === 'results' && stats && (
        <ResultsScreen stats={stats} onRestart={handleRestart} />
      )}
    </main>
  );
}
