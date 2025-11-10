import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { PasswordGenerator } from './components/password-generator/password-generator';
import { PasswordExplanation } from './components/password-explanation/password-explanation';
import { PwnedPasswordChecker } from './components/pwned-password-checker/pwned-password-checker';

@Component({
  selector: 'app-root',
  imports: [Header, PasswordGenerator, PasswordExplanation, PwnedPasswordChecker],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
