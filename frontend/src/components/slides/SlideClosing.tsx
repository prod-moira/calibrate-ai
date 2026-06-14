import { AssessmentSummary } from '@shared';
import './slides.css';

interface Props {
  summary: AssessmentSummary;
  onComplete: () => void;
}

export function SlideClosing({ summary, onComplete }: Props) {
  return (
    <div
      className="slide-zoom-in"
      style={{ padding: '2rem', boxSizing: 'border-box', textAlign: 'center' }}
    >
      <p>{summary.closingStatement}</p>
      <button onClick={onComplete}>See your career matches</button>
    </div>
  );
}
