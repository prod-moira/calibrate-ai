import React, { useState, useEffect } from 'react';
import useDiscover from './hooks/useDiscover';
import LandingPage from './components/LandingPage';
import ExplanationPage from './components/ExplanationPage';
import QuizScreen from './components/QuizScreen';
import SummarySlides from './components/SummarySlides';
import CareerCardsScreen from './components/CareerCardsScreen';

function App() {
  const [stage, setStage] = useState<'LANDING' | 'EXPLANATION' | 'QUIZ' | 'SLIDES' | 'RESULTS'>('LANDING');
  const { discover, response, isLoading, error, reset } = useDiscover();

  // Advance to SummarySlides once response arrives successfully
  useEffect(() => {
    if (response !== null) {
      setStage('SLIDES');
    }
  }, [response]);

  const handleSlidesComplete = () => {
    setStage('RESULTS');
  };

  const handleRetake = () => {
    reset();
    setStage('QUIZ');
  };

  return (
    <>
      {stage === 'LANDING' && (
        <LandingPage onStart={() => setStage('EXPLANATION')} />
      )}

      {stage === 'EXPLANATION' && (
        <ExplanationPage
          onStartQuiz={() => setStage('QUIZ')}
          onBack={() => setStage('LANDING')}
        />
      )}

      {stage === 'QUIZ' && (
        <QuizScreen
          discover={discover}
          isLoading={isLoading}
          error={error}
          reset={reset}
        />
      )}

      {stage === 'SLIDES' && response && (
        <SummarySlides
          summary={response.summary}
          onComplete={handleSlidesComplete}
        />
      )}

      {stage === 'RESULTS' && (
        <CareerCardsScreen
          careers={response?.careers ?? []}
          error={error}
          onRetake={handleRetake}
        />
      )}
    </>
  );
}

export default App;
