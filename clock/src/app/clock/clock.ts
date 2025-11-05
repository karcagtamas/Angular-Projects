import { Component, inject, OnInit, signal } from '@angular/core';
import { CLOCK_CONSTANTS as cc } from './clock.constants';
import { CommonModule } from '@angular/common';
import { TimeService } from '../services/time.service';

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

@Component({
  selector: 'app-clock',
  imports: [CommonModule],
  templateUrl: './clock.html',
  styleUrl: './clock.scss',
})
export class Clock implements OnInit {
  private readonly timeService = inject(TimeService);
  protected readonly time = signal<Time>({ hours: 0, minutes: 0, seconds: 0 });
  protected readonly clockNumbers = this.generateClockNumbers();

  private generateClockNumbers() {
    const numbers = [];
    const centerOffset = cc.CENTER_OFFSET;
    const radius = cc.RADIUS;

    for (let n = 1; n <= 12; n++) {
      const angle = (n - 3) * cc.DEGREES_PER_HOUR * cc.DEF_TO_RAD;
      const top = centerOffset + radius * Math.sin(angle);
      const left = centerOffset + radius * Math.cos(angle);

      // Add numbers to the array
      numbers.push({
        number: n,
        position: {
          top: `${top}%`,
          left: `${left}%`,
        },
      });
    }

    return numbers;
  }

  ngOnInit(): void {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  }

  private updateClock(): void {
    const now = this.timeService.getCurrentTime();
    this.time.set({
      hours:
        (now.getHours() % 12) * cc.DEGREES_PER_HOUR +
        now.getMinutes() * cc.MINUTE_ADJUSTMENT +
        cc.OFFSET_ROTATION,
      minutes:
        now.getMinutes() * cc.DEGREES_PER_MINUTE_SECOND +
        now.getSeconds() * cc.SECOND_ADJUSTMENT +
        cc.OFFSET_ROTATION,
      seconds: now.getSeconds() * cc.DEGREES_PER_MINUTE_SECOND + cc.OFFSET_ROTATION,
    });
  }
}
