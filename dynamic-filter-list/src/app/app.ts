import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter-pipe';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, FilterPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly searchText = signal('');
  protected readonly items = [
    'Angular Tutorial',
    'React Tutorial',
    'Vue.js Tutorial',
    'Javascript Basics',
    'Typescript Fundamentals',
    'Mastering Angular',
  ];
}
