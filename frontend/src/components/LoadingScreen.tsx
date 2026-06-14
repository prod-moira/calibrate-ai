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
        gap: '1rem',
        background: '#0f0f13',
        color: '#f0f0f0',
      }}
    >
      <div
        style={{
          width: '2.5rem',
          height: '2.5rem',
          border: '3px solid #333',
          borderTop: '3px solid #7c6fff',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <p>Generating your assessment…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default LoadingScreen;
