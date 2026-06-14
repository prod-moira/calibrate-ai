import { AssessmentSummary } from '@shared';
import './slides.css';

interface Props {
  summary: AssessmentSummary;
}

export function SlideEnvironment({ summary }: Props) {
  return (
    <div
      className="slide-bounce-in"
      style={{ padding: '2rem', boxSizing: 'border-box', textAlign: 'center' }}
    >
      <h2>Where You Thrive</h2>
      <ul>
        {summary.environmentFits.map((e, i) => (
          <li key={i}>{e}</li>
        ))}
      </ul>
      <p>
        <em>Avoid: {summary.environmentMismatch}</em>
      </p>
    </div>
  );
}
