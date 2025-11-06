import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  private readonly fb = inject(FormBuilder);

  protected readonly contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.maxLength(50)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  protected readonly status = signal<'success' | 'error' | null>(null);

  protected get name(): AbstractControl {
    return this.contactForm.get('name')!;
  }

  protected get email(): AbstractControl {
    return this.contactForm.get('email')!;
  }

  protected get subject(): AbstractControl {
    return this.contactForm.get('subject')!;
  }

  protected get message(): AbstractControl {
    return this.contactForm.get('message')!;
  }

  protected onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Feedback Submitted!', this.contactForm.value);
      this.status.set('success');
    } else {
      console.log('Form is invalid!');
    }

    setTimeout(() => {
      this.status.set(null);
    }, 5000);
  }
}
