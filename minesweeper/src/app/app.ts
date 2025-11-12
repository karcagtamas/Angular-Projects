import { Component } from '@angular/core';
import { Minesweeper } from './components/minesweeper/minesweeper';

@Component({
  selector: 'app-root',
  imports: [Minesweeper],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
