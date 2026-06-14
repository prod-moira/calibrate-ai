import React, { useEffect, useRef } from 'react';

interface LandingPageProps {
  onStart: () => void;
}

function LandingPage({ onStart }: LandingPageProps) {
  return (
    
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100dvh',
        color: '#ffffff',
        padding: '2rem',
        textAlign: 'center',
        fontFamily: 'var(--font-sans)',
        position: 'relative',
        overflow: 'hidden',
        background: '#0C447C',
      }}
    >
      <img src="/landing-page.png" alt="Calibrate" style={{ width: '60px', height: '60px', marginBottom: '1rem' }} />
      {/* Animated gradient orbs */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          width: '600px', height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(250,199,117,0.18) 0%, transparent 70%)',
          top: '-10%', left: '-10%',
          animation: 'drift1 12s ease-in-out infinite alternate',
        }} />
        <div style={{
          position: 'absolute',
          width: '500px', height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(93,202,165,0.13) 0%, transparent 70%)',
          bottom: '-10%', right: '-5%',
          animation: 'drift2 15s ease-in-out infinite alternate',
        }} />
        <div style={{
          position: 'absolute',
          width: '400px', height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
          top: '40%', left: '50%',
          animation: 'drift3 10s ease-in-out infinite alternate',
        }} />
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '600px', width: '100%',
        animation: 'fade-up 0.8s ease-out',
        position: 'relative', zIndex: 1,
      }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
          fontWeight: 600,
          marginBottom: '1rem',
          color: '#ffffff',
        }}>
          Calibrate
        </h1>
        <p style={{
          fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
          color: 'rgba(255,255,255,0.7)',
          marginBottom: '2.5rem',
          fontWeight: 300,
          lineHeight: 1.5,
        }}>
          Explore career paths tailored for Filipino students.
        </p>
        <button onClick={onStart} className="btn-primary" style={{ fontSize: '1rem', padding: '0.8rem 2rem' }}>
          Get Started
        </button>
      </div>

      <style>{`
        @keyframes drift1 {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(60px, 40px) scale(1.1); }
        }
        @keyframes drift2 {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(-50px, -30px) scale(1.15); }
        }
        @keyframes drift3 {
          from { transform: translate(-50%, -50%) scale(1); }
          to { transform: translate(-50%, -50%) scale(1.2); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default LandingPage;