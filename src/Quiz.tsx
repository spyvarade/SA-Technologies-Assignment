// src/Quiz.tsx
import React, { useState, useEffect } from "react";
import { initStorage, saveScore, getAverageScore } from "./storage";

import { QUESTIONS } from "./questions";

const Quiz: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState<number | null>(null);
  const [averageScore, setAverageScore] = useState<number | null>(null);

  useEffect(() => {
    initStorage();
    const loadScores = async () => {
      const avgScore = await getAverageScore();
      setAverageScore(avgScore);
    };
    loadScores();
  }, []);

  const handleAnswerChange = (questionId: number, answer: boolean) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    const numberOfQuestions = Object.keys(QUESTIONS).length;
    const numberOfYesAnswers = Object.values(answers).filter(Boolean).length;
    const calculatedScore = (100 * numberOfYesAnswers) / numberOfQuestions;
    setScore(calculatedScore);
    await saveScore(calculatedScore);
    const avgScore = await getAverageScore();
    setAverageScore(avgScore);
  };

  return (
    <div>
      <h1>Yes/No Quiz</h1>
      {Object.entries(QUESTIONS).map(([id, question]) => (
        <div key={id}>
          <p>{question}</p>
          <button onClick={() => handleAnswerChange(Number(id), true)}>
            Yes
          </button>
          <button onClick={() => handleAnswerChange(Number(id), false)}>
            No
          </button>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      {score !== null && <p>Your score: {score.toFixed(2)}</p>}
      {averageScore !== null && <p>Average score: {averageScore.toFixed(2)}</p>}
    </div>
  );
};

export default Quiz;
