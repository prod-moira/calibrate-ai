import React from 'react';
import type { AnswerCategory } from '@shared';
// @ts-ignore: Allow importing CSS without type declarations
import './QuestionCard.css';

interface QuestionCardProps {
  question: string;
  options: { label: 'A' | 'B' | 'C' | 'D'; text: string; category: AnswerCategory }[];
  selectedCategory: AnswerCategory | null;
  onAnswer: (category: AnswerCategory) => void;
}

function QuestionCard({ question, options, selectedCategory, onAnswer }: QuestionCardProps) {
  return (
    <div className="question-card">
      <h2 className="question-card__question">{question}</h2>
      <div
        className="question-card__options"
        role="group"
        aria-label="Answer options"
      >
        {options.map((option) => {
          const isSelected = selectedCategory === option.category;
          return (
            <button
              key={option.label}
              className={`question-card__option${isSelected ? ' selected' : ''}`}
              aria-label={`Option ${option.label}: ${option.text}`}
              aria-pressed={isSelected}
              onClick={() => onAnswer(option.category)}
            >
              <span className="question-card__option-label">{option.label}</span>
              <span className="question-card__option-text">{option.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionCard;
