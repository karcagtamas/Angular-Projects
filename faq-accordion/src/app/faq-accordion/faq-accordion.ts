import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-faq-accordion',
  imports: [CommonModule],
  templateUrl: './faq-accordion.html',
  styleUrl: './faq-accordion.scss',
})
export class FaqAccordion {
  protected readonly openedIndex = signal<number | null>(null);

  protected readonly faqs = [
    {
      question: 'What is Angular?',
      answer: 'Angular is a platform for building mobile and desktop web applications.',
    },
    {
      question: 'What is a component in Angular?',
      answer:
        'A component controls a patch of the screen called a view. Components are the main building block of Angular applications.',
    },
    {
      question: 'What are Angular directives?',
      answer:
        'Directives are instructions in the DOM. Angular directives allow tou to attach behaviour to emements in the DOM.',
    },
  ];

  protected toggleFAQ(index: number): void {
    this.openedIndex.update((idx) => {
      return idx === index ? null : index;
    });
  }
}
