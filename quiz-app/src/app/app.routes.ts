import { Routes } from '@angular/router';
import { QuizListPage } from './pages/quiz-list-page/quiz-list-page';
import { Quiz } from './components/quiz/quiz';
import { CreateQuizPage } from './pages/create-quiz-page/create-quiz-page';
import { HistoryPage } from './pages/history-page/history-page';

export const routes: Routes = [
  { path: '', component: QuizListPage },
  { path: 'quiz/:index', component: Quiz },
  { path: 'quiz-list', component: QuizListPage },
  { path: 'create-quiz', component: CreateQuizPage },
  { path: 'history', component: HistoryPage },
];
