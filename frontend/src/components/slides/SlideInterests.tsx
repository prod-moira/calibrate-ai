import { AssessmentSummary } from '@shared';
import './slides.css';

interface Props {
  summary: AssessmentSummary;
}

export function SlideInterests({ summary }: Props) {
  return (
    <div
      className="slide-rotate-in"
      style={{ padding: '2rem', boxSizing: 'border-box', textAlign: 'center' }}
    >
      <h2>Your Interests</h2>
      <ul>
        {summary.interests.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
