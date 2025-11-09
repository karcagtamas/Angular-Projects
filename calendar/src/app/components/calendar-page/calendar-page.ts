import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DayCard } from '../day-card/day-card';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar-page',
  imports: [CommonModule, DayCard],
  templateUrl: './calendar-page.html',
  styleUrl: './calendar-page.scss',
})
export class CalendarPage implements OnInit {
  private readonly calendarService = inject(CalendarService);

  protected readonly days = signal<Date[]>([]);
  protected readonly currentMonth = signal(new Date().getMonth());
  protected readonly currentYear = signal(new Date().getFullYear());
  protected readonly monthAndYear = computed(() => {
    const date = new Date(this.currentYear(), this.currentMonth(), 1);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  });

  ngOnInit(): void {
    this.loadMonth(this.currentYear(), this.currentMonth());
  }

  private loadMonth(year: number, month: number): void {
    this.days.set(this.calendarService.getDaysInMonth(year, month));
  }

  protected nextMonth(): void {
    const { newYear, newMonth } = this.calendarService.nextMonth(
      this.currentYear(),
      this.currentMonth()
    );
    this.currentYear.set(newYear);
    this.currentMonth.set(newMonth);
    this.loadMonth(this.currentYear(), this.currentMonth());
  }

  protected previousMonth(): void {
    const { newYear, newMonth } = this.calendarService.previousMonth(
      this.currentYear(),
      this.currentMonth()
    );
    this.currentYear.set(newYear);
    this.currentMonth.set(newMonth);
    this.loadMonth(this.currentYear(), this.currentMonth());
  }
}
