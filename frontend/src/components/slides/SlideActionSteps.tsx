import React from 'react';
import { AssessmentSummary } from '@shared';
// TypeScript may not have CSS module declarations in this project setup.
// @ts-ignore: Allow importing CSS for side effects
import './slides.css';

interface Props {
  summary: AssessmentSummary;
}

export function SlideActionSteps({ summary }: Props) {
  return (
    <div
      className="slide-flip-in"
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
          Your Action Plan
        </h2>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          overflowY: 'auto',
          maxHeight: '65dvh',
          paddingRight: '0.25rem',
          textAlign: 'left',
        }}>
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderLeft: '4px solid var(--color-primary)',
            borderRadius: '0.5rem var(--card-radius) var(--card-radius) 0.5rem',
            padding: '1.25rem 1.5rem',
            boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--color-primary)',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              This Month
            </h3>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.95rem',
              color: 'rgba(255, 255, 255, 0.9)',
              margin: 0,
              lineHeight: 1.5,
            }}>
              {summary.actionSteps.thisMonth}
            </p>
          </div>

          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderLeft: '4px solid var(--color-accent)',
            borderRadius: '0.5rem var(--card-radius) var(--card-radius) 0.5rem',
            padding: '1.25rem 1.5rem',
            boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--color-accent)',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              This Year
            </h3>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.95rem',
              color: 'rgba(255, 255, 255, 0.9)',
              margin: 0,
              lineHeight: 1.5,
            }}>
              {summary.actionSteps.thisYear}
            </p>
          </div>

          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderLeft: '4px solid #ffffff',
            borderRadius: '0.5rem var(--card-radius) var(--card-radius) 0.5rem',
            padding: '1.25rem 1.5rem',
            boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Long Term
            </h3>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.95rem',
              color: 'rgba(255, 255, 255, 0.9)',
              margin: 0,
              lineHeight: 1.5,
            }}>
              {summary.actionSteps.longTerm}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
