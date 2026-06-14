import React, { useState, useEffect, useRef } from 'react';
import type { AnswerCategory, QuizResult } from '@shared';
import { buildQuizResult } from '../utils/buildQuizResult';
import { deriveStabilityPriority } from '../utils/deriveStabilityPriority';
import QuestionCard from './QuestionCard';
import LoadingScreen from './LoadingScreen';

// ── Quiz data ─────────────────────────────────────────────────────────────────

interface QuizQuestion {
  step: number;
  question: string;
  options: { label: 'A' | 'B' | 'C' | 'D'; text: string; category: AnswerCategory }[];
}

const QUIZ_DATA: QuizQuestion[] = [
  // Step 0: Interests
  {
    step: 0,
    question: "When you have free time, you're most likely to...",
    options: [
      { label: 'A', text: "Research a topic you're curious about", category: 'Analytical' },
      { label: 'B', text: 'Work on a creative project', category: 'Creative' },
      { label: 'C', text: 'Organise something or take charge of a task', category: 'Leadership' },
      { label: 'D', text: 'Spend time with people or help someone', category: 'People' },
    ],
  },
  {
    step: 0,
    question: 'Which school subject do you enjoy most?',
    options: [
      { label: 'A', text: 'Science or Maths', category: 'Analytical' },
      { label: 'B', text: 'Arts, Music, or Literature', category: 'Creative' },
      { label: 'C', text: 'History, Government, or Leadership activities', category: 'Leadership' },
      { label: 'D', text: 'Filipino, Social Studies, or community work', category: 'People' },
    ],
  },
  {
    step: 0,
    question: "If you could join any school club, you'd choose...",
    options: [
      { label: 'A', text: 'Science or Debate Club', category: 'Analytical' },
      { label: 'B', text: 'Art, Theatre, or Music Club', category: 'Creative' },
      { label: 'C', text: 'Student Government or Business Club', category: 'Leadership' },
      { label: 'D', text: 'Community Service or Peer Counselling', category: 'People' },
    ],
  },
  {
    step: 0,
    question: 'Your ideal weekend activity is...',
    options: [
      { label: 'A', text: 'Solving puzzles or learning something new', category: 'Analytical' },
      { label: 'B', text: 'Drawing, writing, or making something', category: 'Creative' },
      { label: 'C', text: 'Planning an event or leading a group outing', category: 'Leadership' },
      { label: 'D', text: 'Volunteering or bonding with family and friends', category: 'People' },
    ],
  },
  {
    step: 0,
    question: 'Which of these appeals to you most?',
    options: [
      { label: 'A', text: 'Understanding how things work', category: 'Analytical' },
      { label: 'B', text: 'Expressing yourself through art or writing', category: 'Creative' },
      { label: 'C', text: 'Building something and getting people on board', category: 'Leadership' },
      { label: 'D', text: 'Making others feel supported or understood', category: 'People' },
    ],
  },
  // Step 1: Strengths
  {
    step: 1,
    question: "Your friends are most likely to say you're...",
    options: [
      { label: 'A', text: 'The one who knows the answers', category: 'Analytical' },
      { label: 'B', text: 'The one with the most original ideas', category: 'Creative' },
      { label: 'C', text: 'The one who gets things done', category: 'Leadership' },
      { label: 'D', text: 'The one people go to for advice', category: 'People' },
    ],
  },
  {
    step: 1,
    question: 'You feel most confident when...',
    options: [
      { label: 'A', text: 'You solve a tricky problem correctly', category: 'Analytical' },
      { label: 'B', text: 'You create something that impresses others', category: 'Creative' },
      { label: 'C', text: 'You lead a team to pull something off', category: 'Leadership' },
      { label: 'D', text: 'You help someone through a hard situation', category: 'People' },
    ],
  },
  {
    step: 1,
    question: 'Which task comes naturally to you?',
    options: [
      { label: 'A', text: 'Breaking down complex information', category: 'Analytical' },
      { label: 'B', text: 'Coming up with fresh approaches', category: 'Creative' },
      { label: 'C', text: 'Delegating and coordinating people', category: 'Leadership' },
      { label: 'D', text: 'Listening and mediating disagreements', category: 'People' },
    ],
  },
  {
    step: 1,
    question: 'In a group project, you naturally take the role of...',
    options: [
      { label: 'A', text: 'The researcher or analyst', category: 'Analytical' },
      { label: 'B', text: 'The designer or creative lead', category: 'Creative' },
      { label: 'C', text: 'The project manager or spokesperson', category: 'Leadership' },
      { label: 'D', text: 'The one who keeps the team together', category: 'People' },
    ],
  },
  {
    step: 1,
    question: 'What do you do best under pressure?',
    options: [
      { label: 'A', text: 'Stay calm and think it through logically', category: 'Analytical' },
      { label: 'B', text: 'Find a creative workaround quickly', category: 'Creative' },
      { label: 'C', text: 'Take charge and direct the team', category: 'Leadership' },
      { label: 'D', text: 'Support and reassure the people around you', category: 'People' },
    ],
  },
  // Step 2: Work Style
  {
    step: 2,
    question: 'You work best in an environment that is...',
    options: [
      { label: 'A', text: 'Quiet and structured, with clear goals', category: 'Analytical' },
      { label: 'B', text: 'Open and flexible, where you can experiment', category: 'Creative' },
      { label: 'C', text: 'Fast-paced, where decisions matter', category: 'Leadership' },
      { label: 'D', text: 'Collaborative and people-centred', category: 'People' },
    ],
  },
  {
    step: 2,
    question: 'Your preferred way to solve a problem is...',
    options: [
      { label: 'A', text: 'Research it thoroughly before acting', category: 'Analytical' },
      { label: 'B', text: 'Try different approaches until one clicks', category: 'Creative' },
      { label: 'C', text: 'Decide quickly and adjust as you go', category: 'Leadership' },
      { label: 'D', text: 'Ask others for their input first', category: 'People' },
    ],
  },
  {
    step: 2,
    question: 'When starting a new task, you usually...',
    options: [
      { label: 'A', text: 'Make a detailed plan before starting', category: 'Analytical' },
      { label: 'B', text: 'Just start and see where it goes', category: 'Creative' },
      { label: 'C', text: 'Set a goal and assign roles immediately', category: 'Leadership' },
      { label: 'D', text: 'Check in with teammates to align first', category: 'People' },
    ],
  },
  {
    step: 2,
    question: 'When you receive feedback, you prefer it to be...',
    options: [
      { label: 'A', text: 'Specific and data-backed', category: 'Analytical' },
      { label: 'B', text: 'Open-ended and encouraging', category: 'Creative' },
      { label: 'C', text: 'Direct and actionable', category: 'Leadership' },
      { label: 'D', text: 'Kind and considerate of feelings', category: 'People' },
    ],
  },
  {
    step: 2,
    question: 'Which type of work energises you most?',
    options: [
      { label: 'A', text: 'Deep focus work — reading, coding, analysing', category: 'Analytical' },
      { label: 'B', text: 'Making something new from scratch', category: 'Creative' },
      { label: 'C', text: 'Running meetings and driving decisions', category: 'Leadership' },
      { label: 'D', text: 'Working directly with or for other people', category: 'People' },
    ],
  },
  // Step 3: Values
  {
    step: 3,
    question: 'What matters most to you in a future job?',
    options: [
      { label: 'A', text: 'Intellectual challenge and learning', category: 'Analytical' },
      { label: 'B', text: 'Creative freedom and self-expression', category: 'Creative' },
      { label: 'C', text: 'Impact, influence, and advancement', category: 'Leadership' },
      { label: 'D', text: 'Helping people and building community', category: 'People' },
    ],
  },
  {
    step: 3,
    question: 'You feel most fulfilled when your work...',
    options: [
      { label: 'A', text: 'Produces accurate, well-researched results', category: 'Analytical' },
      { label: 'B', text: 'Lets you express your unique voice', category: 'Creative' },
      { label: 'C', text: 'Moves a project or team forward', category: 'Leadership' },
      { label: 'D', text: "Directly improves someone's situation", category: 'People' },
    ],
  },
  {
    step: 3,
    question: 'When things go wrong, you blame...',
    options: [
      { label: 'A', text: 'Lack of clear data or planning', category: 'Analytical' },
      { label: 'B', text: 'Too many constraints on how to do it', category: 'Creative' },
      { label: 'C', text: 'Poor coordination or weak leadership', category: 'Leadership' },
      { label: 'D', text: 'Miscommunication or lack of teamwork', category: 'People' },
    ],
  },
  {
    step: 3,
    question: 'Which environment sounds most right to you?',
    options: [
      { label: 'A', text: 'Lab, research office, or tech company', category: 'Analytical' },
      { label: 'B', text: 'Studio, agency, or media company', category: 'Creative' },
      { label: 'C', text: 'Boardroom, startup, or government office', category: 'Leadership' },
      { label: 'D', text: 'School, clinic, NGO, or community centre', category: 'People' },
    ],
  },
  {
    step: 3,
    question: 'What is your biggest non-negotiable in a career?',
    options: [
      { label: 'A', text: 'Continuous learning and growth', category: 'Analytical' },
      { label: 'B', text: 'Space to be original and innovative', category: 'Creative' },
      { label: 'C', text: 'Authority and opportunity to lead', category: 'Leadership' },
      { label: 'D', text: 'Feeling like your work matters to others', category: 'People' },
    ],
  },
  // Step 4: Future Vision
  {
    step: 4,
    question: 'In 10 years, you picture yourself as...',
    options: [
      { label: 'A', text: 'An expert or specialist in your field', category: 'Analytical' },
      { label: 'B', text: 'A recognised creator or innovator', category: 'Creative' },
      { label: 'C', text: 'A leader managing a team or organisation', category: 'Leadership' },
      { label: 'D', text: 'Someone doing meaningful work with people', category: 'People' },
    ],
  },
  {
    step: 4,
    question: 'Which achievement would make you most proud?',
    options: [
      { label: 'A', text: 'Publishing a paper or building a complex system', category: 'Analytical' },
      { label: 'B', text: 'Launching a product, film, or art project', category: 'Creative' },
      { label: 'C', text: 'Building a company or leading a major initiative', category: 'Leadership' },
      { label: 'D', text: "Changing someone's life through your work", category: 'People' },
    ],
  },
  {
    step: 4,
    question: 'Your ideal career would be described as...',
    options: [
      { label: 'A', text: 'Precise, technical, and evidence-based', category: 'Analytical' },
      { label: 'B', text: 'Expressive, experimental, and cutting-edge', category: 'Creative' },
      { label: 'C', text: 'Strategic, high-stakes, and influential', category: 'Leadership' },
      { label: 'D', text: 'Nurturing, communicative, and purpose-driven', category: 'People' },
    ],
  },
  {
    step: 4,
    question: 'Which problem would you most want to help solve?',
    options: [
      { label: 'A', text: 'A technical or scientific challenge', category: 'Analytical' },
      { label: 'B', text: 'A communication or design challenge', category: 'Creative' },
      { label: 'C', text: 'An organisational or social systems challenge', category: 'Leadership' },
      { label: 'D', text: 'A health, education, or wellbeing challenge', category: 'People' },
    ],
  },
  {
    step: 4,
    question: 'How do you want to be remembered at work?',
    options: [
      { label: 'A', text: 'The smartest person in the room', category: 'Analytical' },
      { label: 'B', text: 'The most original thinker', category: 'Creative' },
      { label: 'C', text: 'The one who made things happen', category: 'Leadership' },
      { label: 'D', text: 'The one who genuinely cared', category: 'People' },
    ],
  },
  // Step 5: Career Motivations
  {
    step: 5,
    question: 'What would you prioritise when choosing a job?',
    options: [
      { label: 'A', text: 'Clear path and financial security', category: 'Analytical' },
      { label: 'B', text: "Following what I'm passionate about", category: 'Creative' },
      { label: 'C', text: 'Balancing stability with something I enjoy', category: 'Leadership' },
      { label: 'D', text: 'A stable job that lets me help others', category: 'People' },
    ],
  },
  {
    step: 5,
    question: 'How do you feel about taking career risks?',
    options: [
      { label: 'A', text: 'Avoid them — I want a predictable income', category: 'Analytical' },
      { label: 'B', text: 'Willing to take big risks for the right opportunity', category: 'Creative' },
      { label: 'C', text: 'Calculated risks are okay', category: 'Leadership' },
      { label: 'D', text: "I'd take risks if it helps people I care about", category: 'People' },
    ],
  },
  {
    step: 5,
    question: 'How important is job stability to you right now?',
    options: [
      { label: 'A', text: "Very important — it's my top concern", category: 'Analytical' },
      { label: 'B', text: 'Not that important — passion matters more', category: 'Creative' },
      { label: 'C', text: 'Important, but not at the cost of growth', category: 'Leadership' },
      { label: 'D', text: 'Important, especially to support my family', category: 'People' },
    ],
  },
  {
    step: 5,
    question: 'If two jobs paid the same, you would choose...',
    options: [
      { label: 'A', text: 'The more stable, in-demand one', category: 'Analytical' },
      { label: 'B', text: 'The one that excites me more creatively', category: 'Creative' },
      { label: 'C', text: 'The one with more growth and leadership potential', category: 'Leadership' },
      { label: 'D', text: 'The one where I get to work with people I like', category: 'People' },
    ],
  },
  {
    step: 5,
    question: 'What would make you stay in a job long-term?',
    options: [
      { label: 'A', text: 'Strong benefits, regular raises, and job security', category: 'Analytical' },
      { label: 'B', text: 'Freedom to create and work on things I love', category: 'Creative' },
      { label: 'C', text: 'Clear advancement and leadership opportunities', category: 'Leadership' },
      { label: 'D', text: 'A workplace where I feel valued and connected', category: 'People' },
    ],
  },
];

const STEP_LABELS = [
  'Interests',
  'Strengths',
  'Work Style',
  'Values',
  'Future Vision',
  'Career Motivations',
];

// ── Component ─────────────────────────────────────────────────────────────────

interface QuizScreenProps {
  discover: (quizResult: QuizResult, stabilityPriority: number) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  reset: () => void;
}

function QuizScreen({ discover, isLoading, error, reset }: QuizScreenProps) {
  // Flat 0–29 index across all 30 questions
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(AnswerCategory | null)[]>(Array(30).fill(null));
  const [pendingAnswer, setPendingAnswer] = useState<AnswerCategory | null>(null);

  // Track whether we've already submitted (prevents double-calls on re-render)
  const submittedRef = useRef(false);

  // Derived indices
  const stepIndex = Math.floor(currentIndex / 5);
  const questionInStep = currentIndex % 5;
  const currentQuestion = QUIZ_DATA[currentIndex];

  // Handle answer tap
  function handleAnswer(category: AnswerCategory) {
    // Ignore taps while an answer is pending (auto-advance in progress)
    if (pendingAnswer !== null) return;

    setPendingAnswer(category);

    setTimeout(() => {
      const newAnswers = [...answers];
      newAnswers[currentIndex] = category;
      setAnswers(newAnswers);
      setPendingAnswer(null);

      if (currentIndex === 29) {
        // Last question — submit
        if (!submittedRef.current) {
          submittedRef.current = true;
          submitQuiz(newAnswers as AnswerCategory[]);
        }
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 400);
  }

  // Build 6×5 matrix and call discover
  function submitQuiz(allAnswers: AnswerCategory[]) {
    const matrix: AnswerCategory[][] = [];
    for (let step = 0; step < 6; step++) {
      matrix.push(allAnswers.slice(step * 5, step * 5 + 5) as AnswerCategory[]);
    }
    const quizResult = buildQuizResult(matrix);
    const step6Answers = matrix[5];
    const stabilityPriority = deriveStabilityPriority(step6Answers);
    void discover(quizResult, stabilityPriority);
  }

  // Handle back arrow
  function handleBack() {
    if (currentIndex === 0) return; // no-op on first question
    // Cancel any pending auto-advance
    setPendingAnswer(null);
    setCurrentIndex(currentIndex - 1);
  }

  // ── Render states ───────────────────────────────────────────────────────────

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error !== null) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100dvh',
          flexDirection: 'column',
          gap: '1rem',
          background: '#0C447C',
          color: '#ffffff',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'var(--font-sans)',
        }}
      >
        <p style={{ color: '#FAC775', maxWidth: '24rem', fontSize: '1.25rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>{error}</p>
        <button
          onClick={() => {
            reset();
            submittedRef.current = false;
            setCurrentIndex(0);
            setAnswers(Array(30).fill(null));
            setPendingAnswer(null);
          }}
          className="btn-primary"
        >
          Retake the quiz
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        background: '#0C447C',
        color: '#ffffff',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '1.5rem 1.5rem 1rem',
          gap: '0.75rem',
        }}
      >
        <button
          aria-label="Go back"
          onClick={handleBack}
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: currentIndex === 0 ? 'default' : 'pointer',
            opacity: currentIndex === 0 ? 0.3 : 1,
            fontSize: '1.5rem',
            padding: '0.25rem',
            lineHeight: 1,
            transition: 'opacity 0.2s',
          }}
          disabled={currentIndex === 0}
        >
          ←
        </button>

        <div style={{ flex: 1 }}>
          <p
            style={{
              margin: 0,
              fontSize: '0.75rem',
              color: 'var(--color-muted-text)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 600,
            }}
          >
            Step {stepIndex + 1} of 6 — {STEP_LABELS[stepIndex]}
          </p>
          {/* Progress bar */}
          <div
            style={{
              marginTop: '0.5rem',
              height: '4px',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '2px',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${((currentIndex + 1) / 30) * 100}%`,
                background: 'var(--color-primary)',
                borderRadius: '2px',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        <span
          style={{ fontSize: '0.85rem', color: 'var(--color-muted-text)', minWidth: '3rem', textAlign: 'right', fontWeight: 600 }}
        >
          {currentIndex + 1}/30
        </span>
      </div>

      {/* Question card */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <QuestionCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedCategory={pendingAnswer ?? answers[currentIndex]}
          onAnswer={handleAnswer}
        />
      </div>

      {/* Step dot indicator */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.625rem',
          padding: '1.5rem',
        }}
      >
        {STEP_LABELS.map((label, i) => (
          <div
            key={label}
            title={label}
            style={{
              width: '0.625rem',
              height: '0.625rem',
              borderRadius: '50%',
              background: i === stepIndex ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.2)',
              transition: 'background 0.2s, transform 0.2s',
              transform: i === stepIndex ? 'scale(1.2)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default QuizScreen;
