import React from 'react';
import { AssessmentSummary } from '@shared';
// @ts-ignore: Allow importing CSS for side effects
import './slides.css';

interface Props {
  summary: AssessmentSummary;
}

export function SlideInterests({ summary }: Props) {
  return (
    <div
      className="slide-rotate-in"
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
          Your Core Interests
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          width: '100%',
        }}>
          {summary.interests.map((interest, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--card-radius)',
                padding: '1.75rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s ease',
              }}
            >
              <div style={{
                width: '0.625rem',
                height: '0.625rem',
                borderRadius: '50%',
                background: 'var(--color-primary)',
                marginBottom: '1rem',
              }} />
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.15rem',
                fontWeight: 600,
                color: '#ffffff',
                margin: 0,
              }}>
                {interest}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
