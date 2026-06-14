import React from 'react';
import { AssessmentSummary } from '@shared';
// TypeScript may not have CSS module declarations in this project setup.
// @ts-ignore: Allow importing CSS for side effects
import './slides.css';

interface Props {
  summary: AssessmentSummary;
}

export function SlideEnvironment({ summary }: Props) {
  return (
    <div
      className="slide-bounce-in"
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
          Work Environment Fit
        </h2>
        
        <div style={{ overflowY: 'auto', maxHeight: '65dvh', paddingRight: '0.25rem', width: '100%' }}>
          <h3 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--color-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '1rem',
            textAlign: 'left',
          }}>
            Environments You'll Thrive In
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '0.875rem',
            marginBottom: '1.75rem',
            textAlign: 'left',
          }}>
            {summary.environmentFits.map((e, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: 'var(--card-radius)',
                  padding: '1rem 1.25rem',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <span style={{ color: 'var(--color-primary)', fontSize: '1.25rem' }}>✓</span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 500, color: '#ffffff' }}>
                  {e}
                </span>
              </div>
            ))}
          </div>

          <h3 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--color-accent)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.75rem',
            textAlign: 'left',
          }}>
            Where You Might Struggle
          </h3>
          <div
            style={{
              background: 'rgba(239, 159, 39, 0.08)',
              border: '1px solid rgba(239, 159, 39, 0.25)',
              borderRadius: 'var(--card-radius)',
              padding: '1.25rem 1.5rem',
              textAlign: 'left',
              boxShadow: '0 4px 12px rgba(239, 159, 39, 0.05)',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.95rem',
              fontWeight: 500,
              color: '#ffffff',
              margin: 0,
              lineHeight: 1.5,
            }}>
              {summary.environmentMismatch}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
