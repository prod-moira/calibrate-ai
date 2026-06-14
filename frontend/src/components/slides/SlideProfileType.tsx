import React from 'react';
import { AssessmentSummary } from '@shared';
// @ts-ignore: Allow importing CSS for side effects
import './slides.css';

interface Props {
  summary: AssessmentSummary;
}

export function SlideProfileType({ summary }: Props) {
  return (
    <div
      className="slide-fade-up"
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
        <p style={{ textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.85rem', color: 'var(--color-muted-text)', marginBottom: '1rem', fontWeight: 600 }}>
          Your Calibrate Profile
        </p>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 6vw, 3.25rem)',
          fontWeight: 400,
          color: '#ffffff',
          lineHeight: 1.25,
          marginBottom: '1.5rem',
          textShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}>
          {summary.profileType}
        </h1>
        <div style={{ width: '4rem', height: '3px', background: 'var(--color-primary)', margin: '1.5rem auto' }} />
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
          fontWeight: 300,
          color: 'var(--color-primary)',
          lineHeight: 1.5,
          maxWidth: '500px',
          margin: '0 auto',
        }}>
          {summary.tagline}
        </p>
      </div>
    </div>
  );
}
