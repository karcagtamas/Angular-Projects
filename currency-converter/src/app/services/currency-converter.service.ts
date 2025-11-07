import { Injectable } from '@angular/core';

export type CURRENCY = 'EUR' | 'USD' | 'GBP' | 'JPY' | 'INR';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConverterService {
  private readonly conversionRates: { [key in CURRENCY]: { [key in CURRENCY]: number } } = {
    USD: { USD: 1, EUR: 0.96, GBP: 0.75, INR: 74.5, JPY: 109 },
    EUR: { USD: 1.04, EUR: 1, GBP: 0.88, INR: 77, JPY: 113 },
    GBP: { USD: 1.33, EUR: 1.14, GBP: 1, INR: 100, JPY: 150 },
    INR: { USD: 0.013, EUR: 0.011, GBP: 0.01, INR: 1, JPY: 1.5 },
    JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0067, INR: 0.67, JPY: 1 },
  };

  getConversionRate(source: CURRENCY, target: CURRENCY): number | null {
    if (this.conversionRates[source] && this.conversionRates[source][target]) {
      return this.conversionRates[source][target];
    }

    return null;
  }

  convertCurrency(amount: number, source: CURRENCY, target: CURRENCY): number {
    const rate = this.getConversionRate(source, target);

    if (rate === null) {
      return 0;
    }

    return amount * rate;
  }
}
