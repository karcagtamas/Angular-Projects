import { Component } from '@angular/core';
import { Joke } from './joke/joke';

@Component({
  selector: 'app-root',
  imports: [Joke],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
