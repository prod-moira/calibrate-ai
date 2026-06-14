import React, { useState } from 'react';
import type { AssessmentSummary } from '@shared';
import {
  SlideProfileType, SlideMotivations, SlideInterests, SlideStrengths,
  SlideGrowthAreas, SlideEnvironment, SlideActionSteps, SlideClosing,
} from './slides';

interface SummarySlidesProps {
  summary: AssessmentSummary;
  onComplete: () => void;
}

function SummarySlides({ summary, onComplete }: SummarySlidesProps) {
  const [slideIndex, setSlideIndex] = useState(0);

  function handleBack() {
    if (slideIndex === 0) return; // no-op on slide 0
    setSlideIndex(slideIndex - 1);
  }

  const slides = [
    <SlideProfileType key="profile" summary={summary} />,
    <SlideMotivations key="motivations" summary={summary} />,
    <SlideInterests key="interests" summary={summary} />,
    <SlideStrengths key="strengths" summary={summary} />,
    <SlideGrowthAreas key="growth" summary={summary} />,
    <SlideEnvironment key="environment" summary={summary} />,
    <SlideActionSteps key="action" summary={summary} />,
    <SlideClosing key="closing" summary={summary} onComplete={onComplete} />,
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        background: '#0C447C',
        color: '#ffffff',
        position: 'relative',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Header with back arrow */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '1.5rem 1.5rem 1rem' }}>
        <button
          aria-label="Go back"
          onClick={handleBack}
          disabled={slideIndex === 0}
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: slideIndex === 0 ? 'default' : 'pointer',
            opacity: slideIndex === 0 ? 0.3 : 1,
            fontSize: '1.5rem',
            padding: '0.25rem',
            lineHeight: 1,
            transition: 'opacity 0.2s',
          }}
        >
          ←
        </button>
        <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: 'var(--color-muted-text)', fontWeight: 600 }}>
          {slideIndex + 1} / 8
        </span>
      </div>

      {/* Slide content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {slides[slideIndex]}
      </div>

      {/* Footer with indicators and Next button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.5rem 1.5rem',
          gap: '1rem',
          flexShrink: 0,
        }}
      >
        {/* Left placeholder to center the dot indicators */}
        <div style={{ width: '4rem' }} />

        {/* Dot indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.625rem' }}>
          {slides.map((_, i) => (
            <div
              key={i}
              style={{
                width: '0.625rem',
                height: '0.625rem',
                borderRadius: '50%',
                background: i === slideIndex ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.2)',
                transition: 'background 0.2s, transform 0.2s',
                transform: i === slideIndex ? 'scale(1.2)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        {/* Next button (only on slides 0 to 6) */}
        <div style={{ width: '4rem', display: 'flex', justifyContent: 'flex-end' }}>
          {slideIndex < 7 ? (
            <button
              onClick={() => setSlideIndex(slideIndex + 1)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-primary)',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 600,
                fontFamily: 'var(--font-sans)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                transition: 'color 0.2s',
              }}
            >
              Next →
            </button>
          ) : (
            <div style={{ width: '4rem' }} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SummarySlides;
