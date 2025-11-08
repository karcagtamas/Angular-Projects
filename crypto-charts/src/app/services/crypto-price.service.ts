import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type CryptoDTO = {
  prices: [number, number][];
};

@Injectable({
  providedIn: 'root',
})
export class CryptoPriceService {
  private readonly http = inject(HttpClient);

  coin: string = 'bitcoin';
  currency: string = 'usd';
  days: string = '7';

  private apiUrl = this.generateApiUrl();
  private readonly updatedSubject = new BehaviorSubject<void>(undefined);

  updateCryptoOptions(coin: string, currency: string, days: string): void {
    this.coin = coin;
    this.currency = currency;
    this.days = days;

    this.apiUrl = this.generateApiUrl();

    this.updatedSubject.next();
  }

  getCryptoPriceData(): Observable<CryptoDTO> {
    return this.http.get<CryptoDTO>(this.apiUrl);
  }

  getUpdated$(): Observable<void> {
    return this.updatedSubject.asObservable();
  }

  private generateApiUrl(): string {
    return `https://api.coingecko.com/api/v3/coins/${this.coin}/market_chart?vs_currency=${this.currency}&days=${this.days}`;
  }
}
