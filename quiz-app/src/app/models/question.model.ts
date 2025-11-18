export type QuestionModel = {
  text: string;
  options: { text: string; isCorrect: boolean }[];
};
