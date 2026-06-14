import React from 'react';
import { AssessmentSummary } from '@shared';
// @ts-ignore: Allow importing CSS for side effects
import './slides.css';

interface Props {
  summary: AssessmentSummary;
}

export function SlideMotivations({ summary }: Props) {
  return (
    <div
      className="slide-scale-in"
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
      <div style={{ maxWidth: '640px', width: '100%' }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
          fontWeight: 400,
          color: '#ffffff',
          marginBottom: '2rem',
        }}>
          What Drives You
        </h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'stretch',
        }}>
          {summary.motivations.map((motivation, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--card-radius)',
                padding: '1.25rem 1.5rem',
                textAlign: 'left',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
                opacity: 0.85,
              }}>
                0{i + 1}
              </span>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.1rem',
                fontWeight: 500,
                color: '#ffffff',
                margin: 0,
              }}>
                {motivation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
