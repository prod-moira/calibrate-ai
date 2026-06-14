import React from 'react';
import type { CareerPath } from '@shared';
// @ts-ignore: Allow importing CSS without type declarations
import './CareerCard.css';

interface CareerCardProps {
  career: CareerPath;
  expanded: boolean;
  onToggle: () => void;
}

function CareerCard({ career, expanded, onToggle }: CareerCardProps) {
  // If any required field is missing, skip rendering
  if (
    !career.title?.trim() ||
    !Array.isArray(career.whatTheyDo) || career.whatTheyDo.length !== 2 ||
    !Array.isArray(career.whyItFits) || career.whyItFits.length !== 2 ||
    !Array.isArray(career.skills) || career.skills.length === 0 ||
    !career.tryItNow?.trim() ||
    !career.phContext?.trim()
  ) {
    return null;
  }

  return (
    <div
      onClick={onToggle}
      className={`career-card${expanded ? ' expanded' : ''}`}
      style={{
        flex: '1 1 280px',
        maxWidth: '400px',
        width: '100%',
      }}
      aria-expanded={expanded}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      <h2 className="career-card__title">
        {career.title}
      </h2>

      {/* Renders always to allow smooth CSS transition on height and opacity */}
      <div className={`career-card__content${expanded ? ' expanded' : ''}`}>
        <section className="career-card__section">
          <h3 className="career-card__section-title">What They Do</h3>
          <ul className="career-card__list">
            {career.whatTheyDo.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="career-card__section">
          <h3 className="career-card__section-title">Why It Fits You</h3>
          <ul className="career-card__list">
            {career.whyItFits.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="career-card__section">
          <h3 className="career-card__section-title">A Day in the Life</h3>
          <p className="career-card__text">
            {career.dayInLife}
          </p>
        </section>

        <section className="career-card__section">
          <h3 className="career-card__section-title">Skills</h3>
          <div className="career-card__skills">
            {career.skills.map((skill, i) => (
              <span key={i} className="career-card__skill-badge">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="career-card__section">
          <h3 className="career-card__section-title">Try It Now</h3>
          <p className="career-card__try-it-box career-card__try-it-text">
            {career.tryItNow}
          </p>
        </section>

        <section className="career-card__section">
          <h3 className="career-card__section-title">In the Philippines</h3>
          <p className="career-card__text">
            {career.phContext}
          </p>
        </section>
      </div>

      <div className="career-card__hint">
        {expanded ? 'Tap to collapse ↑' : 'Tap to expand ↓'}
      </div>
    </div>
  );
}

export default CareerCard;
