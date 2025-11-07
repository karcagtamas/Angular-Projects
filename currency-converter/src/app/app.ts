import { Component } from '@angular/core';
import { CurrencyController } from './currency-controller/currency-controller';

@Component({
  selector: 'app-root',
  imports: [CurrencyController],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
