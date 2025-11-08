import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CryptoPriceService } from '../../services/crypto-price.service';

@Component({
  selector: 'app-crypto-options',
  imports: [CommonModule, FormsModule],
  templateUrl: './crypto-options.html',
  styleUrl: './crypto-options.scss',
})
export class CryptoOptions implements OnInit {
  private readonly cryptoPriceService = inject(CryptoPriceService);

  protected readonly coin = signal('');
  protected readonly currency = signal('');
  protected readonly days = signal('');

  protected readonly coinOptions = [
    'bitcoin',
    'ethereum',
    'litecoin',
    'dogecoin',
    'cardano',
    'binancecoin',
    'solana',
    'polkadot',
    'ripple',
    'uniswap',
    'chainlink',
    'shiba-inu',
    'avalanche',
    'tron',
  ];

  protected readonly currencyOptions = [
    'usd',
    'eur',
    'gbp',
    'jpy',
    'aud',
    'cad',
    'chf',
    'cny',
    'inr',
    'brl',
  ];

  protected readonly daysOptions = ['7', '14', '30', '90', '180', '365'];

  ngOnInit(): void {
    this.coin.set(this.cryptoPriceService.coin);
    this.currency.set(this.cryptoPriceService.currency);
    this.days.set(this.cryptoPriceService.days);
  }

  protected onSubmit(): void {
    this.cryptoPriceService.updateCryptoOptions(this.coin(), this.currency(), this.days());
  }
}
