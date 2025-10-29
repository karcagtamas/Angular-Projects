import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  imports: [CommonModule],
  templateUrl: './stopwatch.html',
  styleUrl: './stopwatch.scss',
})
export class Stopwatch {
  protected readonly elapsedTime = signal(0);
  protected readonly isRunning = signal(false);

  protected intervalRef?: number;

  private start(): void {
    this.isRunning.set(true);
    this.intervalRef = setInterval(() => {
      this.elapsedTime.update((val) => val + 0.1);
    }, 100);
    console.info('Stopwatch started.');
  }

  private stop(): void {
    this.isRunning.set(false);
    clearInterval(this.intervalRef);
    console.info('Stopwatch stopped.');
  }

  protected reset(): void {
    this.isRunning.set(false);
    clearInterval(this.intervalRef);
    this.elapsedTime.set(0);
    console.log('Stopwatch reseted');
  }

  protected toggle(): void {
    this.isRunning() ? this.stop() : this.start();
  }
}
