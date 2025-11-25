import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { CustomCursorDirective } from './directives/custom-cursor.directive';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CustomCursorDirective],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
