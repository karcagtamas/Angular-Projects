import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly name = signal('John Doe');
  protected readonly age = signal(30);
  protected readonly description = signal('A passionate developer learning Angular');
}
