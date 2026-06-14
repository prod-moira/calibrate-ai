import React from 'react';
import { AssessmentSummary } from '@shared';
// @ts-ignore: Allow importing CSS for side effects
import './slides.css';

interface Props {
  summary: AssessmentSummary;
}

export function SlideGrowthAreas({ summary }: Props) {
  return (
    <div
      className="slide-slide-left"
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
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
          fontWeight: 400,
          color: '#ffffff',
          marginBottom: '2rem',
        }}>
          Areas to Develop
        </h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          textAlign: 'left',
        }}>
          {summary.growthAreas.map((g, i) => (
            <div
              key={i}
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderLeft: '4px solid var(--color-accent)',
                borderRadius: '0.5rem var(--card-radius) var(--card-radius) 0.5rem',
                padding: '1.25rem 1.5rem',
                boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                fontWeight: 500,
                color: '#ffffff',
                margin: 0,
                lineHeight: 1.4,
              }}>
                {g}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
