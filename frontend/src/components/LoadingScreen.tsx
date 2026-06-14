import React from 'react';

function LoadingScreen() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100dvh',
        flexDirection: 'column',
        gap: '1.25rem',
        background: '#0C447C',
        color: '#ffffff',
        fontFamily: "var(--font-sans)",
      }}
    >
      <div
        style={{
          width: '3rem',
          height: '3rem',
          border: '3px solid rgba(255, 255, 255, 0.15)',
          borderTop: '3px solid #FAC775',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <p>Analysing your quiz patterns…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default LoadingScreen;
