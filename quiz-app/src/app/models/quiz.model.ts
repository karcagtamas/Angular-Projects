import { QuestionModel } from './question.model';

export type QuizModel = {
  title: string;
  questions: QuestionModel[];
};
