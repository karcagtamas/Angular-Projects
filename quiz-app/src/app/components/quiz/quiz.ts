import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Question } from '../question/question';
import { QuizModel } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryService } from '../../services/history.service';

type Scoring = {
  maxScore: number;
  percentage: number;
};

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, Question],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss',
})
export class Quiz implements OnInit, OnDestroy {
  private readonly quizService = inject(QuizService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly historyService = inject(HistoryService);

  protected readonly quiz = signal<QuizModel | null>(null);

  protected readonly questionIndex = signal(0);
  protected readonly answeredQuestions = signal(new Set<number>());
  protected readonly isComplete = computed(() => {
    if (!this.quiz()) {
      return false;
    }

    if (this.answeredQuestions().size >= (this.quiz()?.questions.length ?? 0)) {
      return true;
    }

    return false;
  });
  protected readonly scoring = computed(() => {
    const maxScore = this.quiz()?.questions.length ?? 0;
    const score = this.getScore();

    return {
      maxScore,
      percentage: maxScore ? (score / maxScore) * 100 : 0,
    } as Scoring;
  });

  async ngOnInit(): Promise<void> {
    this.quizService.resetScore();
    await this.loadQuiz();
  }

  ngOnDestroy(): void {
    this.router.navigate(['/']);
  }

  protected handleAnswer(isCorrect: boolean, questionIndex: number): void {
    if (this.answeredQuestions().has(questionIndex)) {
      return;
    }

    this.answeredQuestions.update((set) => {
      set.add(questionIndex);
      return new Set(set);
    });

    if (!isCorrect) {
      return;
    }

    this.quizService.incrementScore();
  }

  protected getScore(): number {
    return this.quizService.getScore().getScore();
  }

  protected addToHistory(): void {
    const quiz = this.quiz();
    if (!quiz) {
      return;
    }

    const score = this.getScore();
    const maxScore = this.scoring().maxScore;
    this.historyService.addHistoryEntry(quiz.title, score, maxScore);
  }

  protected goToMainMenu(): void {
    this.addToHistory();
    this.router.navigate(['/']);
  }

  private async loadQuiz(): Promise<void> {
    const quizIndex = Number(this.route.snapshot.paramMap.get('index'));

    try {
      this.quiz.set(await this.quizService.getQuiz(quizIndex));
    } catch (err) {
      console.error('Failed to load quiz: ', err);
      this.router.navigate(['/']);
    }
  }
}
