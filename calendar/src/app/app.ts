import { Component, signal } from '@angular/core';
import { CalendarPage } from './components/calendar-page/calendar-page';

@Component({
  selector: 'app-root',
  imports: [CalendarPage],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
