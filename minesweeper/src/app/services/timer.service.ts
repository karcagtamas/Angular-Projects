import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timerInterval: number | undefined;
  private _time = 0;

  get time(): number {
    return this._time;
  }

  start(): void {
    this.reset();
    this.timerInterval = setInterval(() => {
      this._time++;
    }, 1000);
  }

  stop(): void {
    clearInterval(this.timerInterval);
  }

  reset(): void {
    this.stop();
    this._time = 0;
  }
}
