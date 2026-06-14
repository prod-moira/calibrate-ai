import React from 'react';
import type { CareerPath } from '@shared';
import CareerCard from './CareerCard';

interface CareerCardsScreenProps {
  careers: CareerPath[];
  error: string | null;
}

function isValidCareerPath(c: CareerPath): boolean {
  return (
    typeof c.title === 'string' && c.title.trim().length > 0 &&
    Array.isArray(c.whatTheyDo) && c.whatTheyDo.length === 3 &&
    Array.isArray(c.whyItFits) && c.whyItFits.length === 2 &&
    typeof c.dayInLife === 'string' && c.dayInLife.trim().length > 0 &&
    Array.isArray(c.skills) && c.skills.length > 0 &&
    typeof c.tryItNow === 'string' && c.tryItNow.trim().length > 0 &&
    typeof c.phContext === 'string' && c.phContext.trim().length > 0
  );
}

function CareerCardsScreen({ careers, error }: CareerCardsScreenProps) {
  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh', background: '#0f0f13', color: '#f0f0f0', padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: '#ff6b6b', maxWidth: '24rem', lineHeight: 1.6 }}>{error}</p>
      </div>
    );
  }

  const validCareers = careers.filter(isValidCareerPath);

  return (
    <div style={{ minHeight: '100dvh', background: '#0f0f13', color: '#f0f0f0', padding: '2rem 1.5rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
        Your Career Matches
      </h1>
      <div
        className="career-cards-row"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          justifyContent: 'center',
        }}
      >
        {validCareers.map((career, i) => (
          <CareerCard key={i} career={career} />
        ))}
      </div>
      <style>{`
        @media (max-width: 767px) {
          .career-cards-row { flex-direction: column; align-items: center; }
          .career-cards-row > * { max-width: 100% !important; }
        }
      `}</style>
    </div>
  );
}

export default CareerCardsScreen;
