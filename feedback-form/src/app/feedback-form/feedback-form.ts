import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-feedback-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback-form.html',
  styleUrl: './feedback-form.scss',
})
export class FeedbackForm {
  protected readonly submitted = signal(false);
  protected readonly name = signal('');
  protected readonly email = signal('');
  protected readonly feedback = signal('');

  protected onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    console.log('Form submitted!', {
      name: this.name(),
      email: this.email(),
      feedback: this.feedback(),
    });
    this.submitted.set(true);
  }
}
