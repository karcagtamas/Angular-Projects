import { Component, computed, inject, input } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-day-card',
  imports: [CommonModule],
  templateUrl: './day-card.html',
  styleUrl: './day-card.scss',
})
export class DayCard {
  private readonly calendarService = inject(CalendarService);

  readonly day = input.required<Date>();
  protected readonly isToday = computed(() => {
    return this.calendarService.isToday(this.day());
  });
  protected readonly isPast = computed(() => {
    return this.calendarService.isPast(this.day());
  });
}
