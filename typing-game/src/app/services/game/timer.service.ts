import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private startTime: number = 0;
  private elapsedTime: number = 0;
  private timeInterval?: number = undefined;
  private isRunning = false;

  private timeSubject = new BehaviorSubject(0);
  time$ = this.timeSubject.asObservable();

  start(): void {
    if (this.isRunning) {
      console.warn('timer is running');
      return;
    }

    this.isRunning = true;
    this.startTime = Date.now() - this.elapsedTime;
    this.timeInterval = setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime;
      this.timeSubject.next(this.elapsedTime);
    }, 100);
  }

  stop(): void {
    if (!this.isRunning) {
      return;
    }

    this.isRunning = false;
    clearInterval(this.timeInterval);
  }

  restart(): void {
    this.stop();
    this.elapsedTime = 0;
    this.start();
  }

  getElapsedTime(): number {
    return this.elapsedTime;
  }

  getElapsedTimeInSeconds(): number {
    return parseFloat((this.elapsedTime / 1000).toFixed(2));
  }
}
