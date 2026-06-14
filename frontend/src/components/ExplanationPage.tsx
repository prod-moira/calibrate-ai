import React from 'react';

interface ExplanationPageProps {
  onStartQuiz: () => void;
  onBack: () => void;
}

function ExplanationPage({ onStartQuiz, onBack }: ExplanationPageProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100dvh',
        background: '#0C447C',
        color: '#ffffff',
        padding: '2rem',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div style={{ maxWidth: '600px', width: '100%', animation: 'fade-up 0.6s ease-out' }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-muted-text)',
            cursor: 'pointer',
            fontSize: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: 0,
          }}
        >
          ← Back
        </button>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            fontWeight: 400,
            marginBottom: '1.5rem',
            color: '#ffffff',
          }}
        >
          How it works
        </h2>

        <div
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--card-radius)',
            padding: '1.75rem',
            marginBottom: '2.5rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '1.75rem',
                height: '1.75rem',
                borderRadius: '50%',
                background: 'var(--color-primary)',
                color: 'var(--color-text-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                flexShrink: 0,
                fontSize: '0.85rem',
              }}
            >
              1
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Answer 30 Questions</h4>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.4 }}>
                Reflect on your daily preferences, strengths, work styles, values, and career motivators.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '1.75rem',
                height: '1.75rem',
                borderRadius: '50%',
                background: 'var(--color-primary)',
                color: 'var(--color-text-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                flexShrink: 0,
                fontSize: '0.85rem',
              }}
            >
              2
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Get Your Personal Summary</h4>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.4 }}>
                Discover your dominant category profile, taglines, motivations, and thriving work environments.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '1.75rem',
                height: '1.75rem',
                borderRadius: '50%',
                background: 'var(--color-primary)',
                color: 'var(--color-text-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                flexShrink: 0,
                fontSize: '0.85rem',
              }}
            >
              3
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Explore Career Matches</h4>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.4 }}>
                View detailed profiles of 3 tailored careers, daily routines, core skills, and specific Philippine context.
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={onStartQuiz} className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
            Start test
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExplanationPage;
