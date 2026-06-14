import { AssessmentSummary } from '@shared';
import './slides.css';

interface Props {
  summary: AssessmentSummary;
}

export function SlideGrowthAreas({ summary }: Props) {
  return (
    <div
      className="slide-slide-left"
      style={{ padding: '2rem', boxSizing: 'border-box', textAlign: 'center' }}
    >
      <h2>Areas to Grow</h2>
      <ul>
        {summary.growthAreas.map((g, i) => (
          <li key={i}>{g}</li>
        ))}
      </ul>
    </div>
  );
}
