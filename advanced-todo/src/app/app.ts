import { Component } from '@angular/core';
import { Todos } from './components/todos/todos';

@Component({
  selector: 'app-root',
  imports: [Todos],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
