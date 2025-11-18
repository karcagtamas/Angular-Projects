import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';
import { QuizModel } from '../../models/quiz.model';

@Component({
  selector: 'app-create-quiz-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-quiz-page.html',
  styleUrl: './create-quiz-page.scss',
})
export class CreateQuizPage {
  private readonly fb = inject(FormBuilder);
  private readonly quizService = inject(QuizService);
  private readonly router = inject(Router);

  protected readonly quizForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    questions: this.fb.array([]),
  });

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  getOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  private createQuestion(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
      options: this.fb.array([this.createOption()]),
    });
  }

  private createOption(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
      isCorrect: [false],
    });
  }

  protected addQuestion(): void {
    this.questions.push(this.createQuestion());
    console.log(`Question added. Total questions: ${this.questions.length}`);
  }

  protected removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  protected addOption(questionIndex: number): void {
    this.getOptions(questionIndex).push(this.createOption());
  }

  protected removeOption(questionIndex: number, optionIndex: number): void {
    this.getOptions(questionIndex).removeAt(optionIndex);
  }

  protected onSubmit(): void {
    if (this.quizForm.valid) {
      console.error('Form is not valid');
    }

    const newQuiz: QuizModel = this.quizForm.value;
    this.quizService.addQuiz(newQuiz);
    this.router.navigate(['/']);
  }
}
