import { Component } from '@angular/core';
import { ThemePicker } from './components/theme-picker/theme-picker';
import { EmojiSearch } from './components/emoji-search/emoji-search';

@Component({
  selector: 'app-root',
  imports: [ThemePicker, EmojiSearch],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
