import React from 'react';
import { AssessmentSummary } from '@shared';
// @ts-ignore: Allow importing CSS for side effects
import './slides.css';

interface Props {
  summary: AssessmentSummary;
}

export function SlideStrengths({ summary }: Props) {
  return (
    <div
      className="slide-blur-in"
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
      <div style={{ maxWidth: '640px', width: '100%', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
          fontWeight: 400,
          color: '#ffffff',
          marginBottom: '1.5rem',
          flexShrink: 0,
        }}>
          Your Key Strengths
        </h2>
        <div 
          className="strengths-scroll-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.875rem',
            overflowY: 'auto',
            paddingRight: '0.25rem',
            textAlign: 'left',
            maxHeight: '60dvh',
          }}
        >
          {summary.strengths.map((s, i) => (
            <div
              key={i}
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--card-radius)',
                padding: '1rem 1.25rem',
                boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
              }}
            >
              <h3 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
                marginBottom: '0.25rem',
              }}>
                {s.label}
              </h3>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.85)',
                margin: 0,
                lineHeight: 1.4,
              }}>
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
