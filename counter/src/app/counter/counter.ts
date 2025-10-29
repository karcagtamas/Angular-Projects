import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [CommonModule],
  templateUrl: './counter.html',
  styleUrl: './counter.scss',
})
export class Counter {
  protected readonly counter = signal(5);
  protected readonly counterStatus = computed(() => {
    return this.counter() > 0 ? 'positive' : this.counter() === 0 ? 'neutral' : 'negative';
  });

  protected increment(): void {
    this.counter.set(this.counter() + 1);
  }

  protected decrement(): void {
    this.counter.set(this.counter() - 1);
  }
}
