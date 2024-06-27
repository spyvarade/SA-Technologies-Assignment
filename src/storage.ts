export const initStorage = () => {
  if (!localStorage.getItem("scores")) {
    localStorage.setItem("scores", JSON.stringify([]));
  }
};

export const getScores = (): number[] => {
  const scores = localStorage.getItem("scores");
  return scores ? JSON.parse(scores) : [];
};

export const saveScore = (score: number) => {
  const scores = getScores();
  scores.push(score);
  localStorage.setItem("scores", JSON.stringify(scores));
};

export const getAverageScore = (): number => {
  const scores = getScores();
  if (scores.length === 0) return 0;
  const total = scores.reduce((sum, score) => sum + score, 0);
  return total / scores.length;
};
