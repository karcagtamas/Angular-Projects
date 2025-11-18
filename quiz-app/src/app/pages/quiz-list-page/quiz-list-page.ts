import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { QuizModel } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz-list-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz-list-page.html',
  styleUrl: './quiz-list-page.scss',
})
export class QuizListPage implements OnInit {
  private readonly quizService = inject(QuizService);
  private readonly router = inject(Router);

  protected readonly quizzes = signal<QuizModel[]>([]);

  async ngOnInit(): Promise<void> {
    try {
      this.quizzes.set(await this.quizService.getQuizzes());
    } catch (err) {
      console.error('Failed to load quizzes', err);
    }
  }

  protected takeQuiz(index: number): void {
    this.router.navigate(['/quiz', index]);
  }
}
