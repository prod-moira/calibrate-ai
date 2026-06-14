import { AssessmentSummary } from '@shared';
import './slides.css';

interface Props {
  summary: AssessmentSummary;
}

export function SlideMotivations({ summary }: Props) {
  return (
    <div
      className="slide-scale-in"
      style={{ padding: '2rem', boxSizing: 'border-box', textAlign: 'center' }}
    >
      <h2>What Drives You</h2>
      <ul>
        {summary.motivations.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
}
