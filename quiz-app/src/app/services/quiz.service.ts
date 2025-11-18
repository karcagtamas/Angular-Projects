import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { QuizModel } from '../models/quiz.model';
import { Score } from '../models/score.model';
import { firstValueFrom, map } from 'rxjs';

const QUIZ_FILE_PATH = 'quizzes.json';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private readonly http = inject(HttpClient);

  private quizzes: QuizModel[] = [];
  private score = new Score();
  private quizzesLoaded: Promise<void>;

  constructor() {
    this.quizzesLoaded = this.loadQuizzesFromJson(QUIZ_FILE_PATH);
  }

  async getQuiz(index: number): Promise<QuizModel> {
    await this.quizzesLoaded;
    return this.quizzes[index];
  }

  async getQuizzes(): Promise<QuizModel[]> {
    await this.quizzesLoaded;
    return this.quizzes;
  }

  getScore(): Score {
    return this.score;
  }

  addQuiz(newQuiz: QuizModel): void {
    this.quizzes.push;
  }

  incrementScore(): void {
    this.score.incrementCorrect();
  }

  resetScore(): void {
    this.score = new Score();
  }

  private loadQuizzesFromJson(jsonPath: string): Promise<void> {
    return firstValueFrom(this.http.get<QuizModel[]>(jsonPath))
      .then((res) => {
        this.quizzes = res;
      })
      .then(() => {
        console.log('Quizzes loaded successfully!');
      })
      .catch((err) => {
        console.log('Failed to load quizzes');
      });
  }
}
