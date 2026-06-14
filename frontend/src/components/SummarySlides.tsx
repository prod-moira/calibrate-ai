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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', background: '#0f0f13', color: '#f0f0f0', position: 'relative' }}>
      {/* Header with back arrow */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '1rem 1.25rem' }}>
        <button
          aria-label="Go back"
          onClick={handleBack}
          disabled={slideIndex === 0}
          style={{
            background: 'none', border: 'none', color: '#f0f0f0',
            cursor: slideIndex === 0 ? 'default' : 'pointer',
            opacity: slideIndex === 0 ? 0.3 : 1,
            fontSize: '1.25rem', padding: '0.25rem', lineHeight: 1,
          }}
        >
          ←
        </button>
        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#888' }}>
          {slideIndex + 1} / 8
        </span>
      </div>

      {/* Slide content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {slides[slideIndex]}
      </div>

      {/* Dot indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', padding: '1rem' }}>
        {slides.map((_, i) => (
          <div
            key={i}
            style={{
              width: '0.5rem', height: '0.5rem', borderRadius: '50%',
              background: i === slideIndex ? '#7c6fff' : '#333',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default SummarySlides;
