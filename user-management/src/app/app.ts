import { Component } from '@angular/core';
import { Users } from './components/users/users';
import { Userform } from './components/userform/userform';

@Component({
  selector: 'app-root',
  imports: [Users, Userform],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
