import React, { useState } from 'react';
import type { CareerPath } from '@shared';

interface CareerCardProps {
  career: CareerPath;
}

function CareerCard({ career }: CareerCardProps) {
  const [expanded, setExpanded] = useState(false);

  // If any required field is missing, skip rendering
  if (
    !career.title?.trim() ||
    !Array.isArray(career.whatTheyDo) || career.whatTheyDo.length !== 3 ||
    !Array.isArray(career.whyItFits) || career.whyItFits.length !== 2 ||
    !career.dayInLife?.trim() ||
    !Array.isArray(career.skills) || career.skills.length === 0 ||
    !career.tryItNow?.trim() ||
    !career.phContext?.trim()
  ) {
    return null;
  }

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        background: '#1a1a24',
        border: `2px solid ${expanded ? '#7c6fff' : '#2a2a38'}`,
        borderRadius: '1rem',
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
        flex: '1 1 280px',
        maxWidth: '400px',
      }}
      aria-expanded={expanded}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setExpanded(!expanded); }}
    >
      <h2 style={{ margin: '0 0 1rem', fontSize: '1.25rem', color: '#f0f0f0' }}>
        {career.title}
      </h2>

      {expanded && (
        <>
          <section>
            <h3 style={{ fontSize: '0.875rem', color: '#7c6fff', margin: '1rem 0 0.5rem' }}>What They Do</h3>
            <ul style={{ paddingLeft: '1.25rem', margin: 0, color: '#ccc' }}>
              {career.whatTheyDo.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h3 style={{ fontSize: '0.875rem', color: '#7c6fff', margin: '1rem 0 0.5rem' }}>Why It Fits You</h3>
            <ul style={{ paddingLeft: '1.25rem', margin: 0, color: '#ccc' }}>
              {career.whyItFits.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h3 style={{ fontSize: '0.875rem', color: '#7c6fff', margin: '1rem 0 0.5rem' }}>A Day in the Life</h3>
            <p style={{ margin: 0, color: '#ccc', lineHeight: 1.6 }}>{career.dayInLife}</p>
          </section>

          <section>
            <h3 style={{ fontSize: '0.875rem', color: '#7c6fff', margin: '1rem 0 0.5rem' }}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
              {career.skills.map((skill, i) => (
                <span key={i} style={{ background: '#2e2b5a', color: '#b0a8ff', padding: '0.25rem 0.625rem', borderRadius: '999px', fontSize: '0.75rem' }}>
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3 style={{ fontSize: '0.875rem', color: '#7c6fff', margin: '1rem 0 0.5rem' }}>Try It Now</h3>
            <p style={{ margin: 0, color: '#ccc', lineHeight: 1.6 }}>{career.tryItNow}</p>
          </section>

          <section>
            <h3 style={{ fontSize: '0.875rem', color: '#7c6fff', margin: '1rem 0 0.5rem' }}>In the Philippines</h3>
            <p style={{ margin: 0, color: '#ccc', lineHeight: 1.6 }}>{career.phContext}</p>
          </section>
        </>
      )}

      <p style={{ margin: '1rem 0 0', fontSize: '0.75rem', color: '#666', textAlign: 'right' }}>
        {expanded ? 'Tap to collapse ↑' : 'Tap to expand ↓'}
      </p>
    </div>
  );
}

export default CareerCard;
