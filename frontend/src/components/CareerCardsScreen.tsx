import React, { useState, useEffect } from 'react';
import type { CareerPath } from '@shared';
import CareerCard from './CareerCard';

interface CareerCardsScreenProps {
  careers: CareerPath[];
  error: string | null;
  onRetake: () => void;
}

function isValidCareerPath(c: CareerPath): boolean {
  return (
    typeof c.title === 'string' && c.title.trim().length > 0 &&
    Array.isArray(c.whatTheyDo) && c.whatTheyDo.length === 2 &&
    Array.isArray(c.whyItFits) && c.whyItFits.length === 2 &&
    Array.isArray(c.skills) && c.skills.length > 0 &&
    typeof c.tryItNow === 'string' && c.tryItNow.trim().length > 0 &&
    typeof c.phContext === 'string' && c.phContext.trim().length > 0
  );
}

function CareerCardsScreen({ careers, error, onRetake }: CareerCardsScreenProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [expandedIndices, setExpandedIndices] = useState<Record<number, boolean>>({});

  // Monitor viewport size to enforce mobile expansion rules
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      // Optional: Collapse all cards when switching viewport layouts to avoid issues
      setExpandedIndices({});
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleToggle = (index: number) => {
    if (isMobile) {
      setExpandedIndices((prev) => {
        const wasOpen = !!prev[index];
        // On mobile, only one card can be open at a time
        return wasOpen ? {} : { [index]: true };
      });
    } else {
      // On desktop, all three can be open simultaneously
      setExpandedIndices((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    }
  };

  // If there is an error, show the error state prompting to retake the quiz (render zero cards)
  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100dvh',
          background: '#042C53',
          color: '#ffffff',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'var(--font-sans)',
        }}
      >
        <div style={{ maxWidth: '28rem' }}>
          <p
            style={{
              color: 'var(--color-primary)',
              fontSize: '1.25rem',
              lineHeight: 1.6,
              marginBottom: '2rem',
              fontFamily: 'var(--font-serif)',
            }}
          >
            {error}
          </p>
          <button onClick={onRetake} className="btn-primary">
            Retake the quiz
          </button>
        </div>
      </div>
    );
  }

  const validCareers = careers.filter(isValidCareerPath);

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: '#042C53',
        color: '#ffffff',
        padding: '3rem 1.5rem',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontSize: '0.8rem',
              color: 'var(--color-muted-text)',
              marginBottom: '0.5rem',
              fontWeight: 700,
            }}
          >
            Discoveries
          </p>
          <h1
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 2.75rem)',
              fontFamily: 'var(--font-serif)',
              fontWeight: 400,
              color: '#ffffff',
              margin: 0,
            }}
          >
            Your Career Matches
          </h1>
          <p
            style={{
              color: 'var(--color-muted-text)',
              marginTop: '0.75rem',
              fontSize: '0.95rem',
            }}
          >
            Tap any card to explore what they do, daily life, and skills in detail.
          </p>
        </header>

        <div className="career-cards-container">
          {validCareers.map((career, i) => (
            <CareerCard
              key={i}
              career={career}
              expanded={!!expandedIndices[i]}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3.5rem' }}>
          <button onClick={onRetake} className="btn-secondary">
            Take Quiz Again
          </button>
        </div>
      </div>

      <style>{`
        .career-cards-container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 1.5rem;
          justify-content: center;
          align-items: flex-start;
          width: 100%;
        }

        @media (max-width: 767px) {
          .career-cards-container {
            flex-direction: column;
            align-items: stretch;
            gap: 1.25rem;
          }
          .career-cards-container > * {
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}

export default CareerCardsScreen;
