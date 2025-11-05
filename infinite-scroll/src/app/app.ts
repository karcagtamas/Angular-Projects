import { Component } from '@angular/core';
import { PostList } from './components/post-list/post-list';

@Component({
  selector: 'app-root',
  imports: [PostList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
