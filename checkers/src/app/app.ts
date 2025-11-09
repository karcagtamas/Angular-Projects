import { Component } from '@angular/core';
import { Checkers } from './components/checkers/checkers';

@Component({
  selector: 'app-root',
  imports: [Checkers],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
