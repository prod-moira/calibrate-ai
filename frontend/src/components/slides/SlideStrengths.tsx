import { AssessmentSummary } from '@shared';
import './slides.css';

interface Props {
  summary: AssessmentSummary;
}

export function SlideStrengths({ summary }: Props) {
  return (
    <div
      className="slide-blur-in"
      style={{ padding: '2rem', boxSizing: 'border-box', textAlign: 'center' }}
    >
      <h2>Your Strengths</h2>
      <ul>
        {summary.strengths.map((s, i) => (
          <li key={i}>
            <strong>{s.label}</strong>: {s.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
