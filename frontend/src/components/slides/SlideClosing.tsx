import React from 'react';
import { AssessmentSummary } from '@shared';
// TypeScript may not have CSS module declarations in this project setup.
// @ts-ignore: Allow importing CSS for side effects
import './slides.css';

interface Props {
  summary: AssessmentSummary;
  onComplete: () => void;
}

export function SlideClosing({ summary, onComplete }: Props) {
  return (
    <div
      className="slide-zoom-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '2rem',
        boxSizing: 'border-box',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <span style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '4rem',
          lineHeight: 0.1,
          color: 'var(--color-primary)',
          display: 'block',
          marginBottom: '1rem',
          opacity: 0.5,
        }}>
          “
        </span>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.25rem, 3.5vw, 1.8rem)',
          fontWeight: 400,
          fontStyle: 'italic',
          color: '#ffffff',
          lineHeight: 1.5,
          marginBottom: '2.5rem',
          textShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}>
          {summary.closingStatement}
        </p>
        <button
          onClick={onComplete}
          className="btn-primary"
          style={{
            fontSize: '1.1rem',
            padding: '1rem 2.5rem',
          }}
        >
          See your career matches
        </button>
      </div>
    </div>
  );
}
