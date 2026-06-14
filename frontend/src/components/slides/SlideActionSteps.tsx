import { AssessmentSummary } from '@shared';
import './slides.css';

interface Props {
  summary: AssessmentSummary;
}

export function SlideActionSteps({ summary }: Props) {
  return (
    <div
      className="slide-flip-in"
      style={{ padding: '2rem', boxSizing: 'border-box', textAlign: 'center' }}
    >
      <h2>Your Action Plan</h2>
      <section>
        <h3>This Month</h3>
        <p>{summary.actionSteps.thisMonth}</p>
      </section>
      <section>
        <h3>This Year</h3>
        <p>{summary.actionSteps.thisYear}</p>
      </section>
      <section>
        <h3>Long Term</h3>
        <p>{summary.actionSteps.longTerm}</p>
      </section>
    </div>
  );
}
