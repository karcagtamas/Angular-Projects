import { Component } from '@angular/core';
import { Stopwatch } from './stopwatch/stopwatch';

@Component({
  selector: 'app-root',
  imports: [Stopwatch],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
