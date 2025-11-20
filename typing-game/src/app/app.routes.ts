import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { TypingTest } from './pages/typing-test/typing-test';
import { Leaderboard } from './pages/leaderboard/leaderboard';
import { Error } from './pages/error/error';
import { About } from './pages/about/about';
import { Themes } from './pages/themes/themes';

export const routes: Routes = [
  { path: '', redirectTo: '/typing-test', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'typing-test', component: TypingTest },
  { path: 'leaderboard', component: Leaderboard },
  { path: 'themes', component: Themes },
  { path: 'about', component: About },
  { path: 'error', component: Error },
  { path: '**', component: Error },
];
