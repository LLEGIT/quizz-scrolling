'use client';

import { useState, useEffect, useRef } from 'react';
import QuestionCard from './QuestionCard';
import SessionHUD from './SessionHUD';
import LoadingSlide from './LoadingSlide';

export default function ScrollFeed({ onSessionEnd }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [sessionToken, setSessionToken] = useState(null);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0, total: 0 });
  const [canAnswer, setCanAnswer] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const timeoutRef = useRef(null);
  const hasInitialized = useRef(false);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const loadQuestions = async (token) => {
      try {
        let url = '/api/questions?amount=5&difficulty=medium';
        if (token) {
          url += `&token=${token}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
          console.error('API Error:', data.error);
          setLoading(false);
          return;
        }

        if (data.questions && Array.isArray(data.questions)) {
          setQuestions(prev => [...prev, ...data.questions]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading questions:', error);
        setLoading(false);
      }
    };

    const requestToken = async () => {
      try {
        const response = await fetch('/api/token?command=request');
        const data = await response.json();
        
        if (data.token) {
          setSessionToken(data.token);
          await loadQuestions(data.token);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error requesting token:', error);
        setLoading(false);
      }
    };

    requestToken();
  }, []);

  // Load more questions when approaching end
  useEffect(() => {
    const loadQuestions = async (token) => {
      try {
        let url = '/api/questions?amount=5&difficulty=medium';
        if (token) {
          url += `&token=${token}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
          console.error('API Error:', data.error);
          isLoadingRef.current = false;
          return;
        }

        if (data.questions && Array.isArray(data.questions)) {
          setQuestions(prev => [...prev, ...data.questions]);
        }
        isLoadingRef.current = false;
      } catch (error) {
        console.error('Error loading questions:', error);
        isLoadingRef.current = false;
      }
    };

    if (
      currentIndex >= questions.length - 2 &&
      !isLoadingRef.current &&
      questions.length > 0 &&
      sessionToken
    ) {
      isLoadingRef.current = true;
      loadQuestions(sessionToken);
    }
  }, [currentIndex, questions.length, sessionToken]);

  // Handle answer
  const handleAnswer = (questionId, answer) => {
    const question = questions.find(q => q.id === questionId);
    const isCorrect = answer === question.correctAnswer;

    setAnswers(prev => ({
      ...prev,
      [questionId]: { answer, isCorrect }
    }));

    setStats(prev => ({
      ...prev,
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      total: prev.total + 1
    }));

    // Disable answering
    setCanAnswer(false);

    // Auto-advance after 2 seconds with fade transition
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setFadeOut(false);
        setCanAnswer(true);
      }, 300);
      timeoutRef.current = null;
    }, 2000);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (loading || questions.length === 0) {
    return (
      <>
        <SessionHUD stats={stats} onEnd={() => onSessionEnd(stats)} />
        <LoadingSlide />
      </>
    );
  }

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentQuestion?.id];

  const handleSessionEnd = async () => {
    if (sessionToken) {
      try {
        await fetch(`/api/token?command=reset&token=${sessionToken}`);
      } catch (error) {
        console.error('Error resetting token:', error);
      }
    }
    onSessionEnd(stats);
  };

  return (
    <>
      <SessionHUD stats={stats} onEnd={handleSessionEnd} />
      
      <div className="fixed top-20 left-0 right-0 bottom-0 w-full bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
        {currentQuestion ? (
          <div
            className={`w-full h-full transition-opacity duration-300 ${
              fadeOut ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <QuestionCard
              question={currentQuestion}
              onAnswer={(answer) => handleAnswer(currentQuestion.id, answer)}
              isAnswered={currentAnswer}
              isLocked={!canAnswer}
            />
          </div>
        ) : (
          <LoadingSlide />
        )}
      </div>
    </>
  );
}
