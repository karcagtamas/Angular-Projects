import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { CryptoPriceChart } from './components/crypto-price-chart/crypto-price-chart';
import { CryptoOptions } from './components/crypto-options/crypto-options';

@Component({
  selector: 'app-root',
  imports: [Header, CryptoPriceChart, CryptoOptions],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
