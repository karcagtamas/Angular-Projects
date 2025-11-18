import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { QuestionModel } from '../../models/question.model';

@Component({
  selector: 'app-question',
  imports: [CommonModule],
  templateUrl: './question.html',
  styleUrl: './question.scss',
})
export class Question {
  question = input.required<QuestionModel>();
  answerSelected = output<boolean>();

  protected selectOption(isCorrect: boolean): void {
    this.answerSelected.emit(isCorrect);
  }
}
