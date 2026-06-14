import { AssessmentSummary } from '@shared';
import './slides.css';

interface Props {
  summary: AssessmentSummary;
}

export function SlideProfileType({ summary }: Props) {
  return (
    <div
      className="slide-fade-up"
      style={{ padding: '2rem', boxSizing: 'border-box', textAlign: 'center' }}
    >
      <h1>{summary.profileType}</h1>
      <p>{summary.tagline}</p>
    </div>
  );
}
