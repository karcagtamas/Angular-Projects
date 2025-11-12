import { Component, inject } from '@angular/core';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.html',
  styleUrl: './timer.scss',
})
export class Timer {
  protected readonly timerService = inject(TimerService);
}
