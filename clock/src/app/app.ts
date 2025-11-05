import { Component } from '@angular/core';
import { Clock } from './clock/clock';

@Component({
  selector: 'app-root',
  imports: [Clock],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
