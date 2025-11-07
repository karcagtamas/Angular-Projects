import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CURRENCY, CurrencyConverterService } from '../services/currency-converter.service';

@Component({
  selector: 'app-currency-controller',
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './currency-controller.html',
  styleUrl: './currency-controller.scss',
})
export class CurrencyController {
  private readonly currencyConverterService = inject(CurrencyConverterService);

  protected readonly amount = signal(0);
  protected readonly sourceCurrency = signal<CURRENCY>('USD');
  protected readonly targetCurrency = signal<CURRENCY>('EUR');
  protected readonly result = signal(0);
  protected readonly conversionRate = signal<number | null>(null);

  protected readonly currencies: CURRENCY[] = ['USD', 'EUR', 'GBP', 'INR', 'JPY'];
  protected readonly currencyDisplayTexts: { [key in CURRENCY]: string } = {
    USD: '🇺🇸 USD',
    EUR: '🇪🇺 EUR',
    GBP: '🇬🇧 GBP',
    INR: '🇮🇳 INR',
    JPY: '🇯🇵 JPY',
  };

  protected convertCurrency(): void {
    this.conversionRate.set(
      this.currencyConverterService.getConversionRate(this.sourceCurrency(), this.targetCurrency())
    );

    if (this.conversionRate() === null) {
      this.result.set(0);
      return;
    }

    this.result.set(
      this.currencyConverterService.convertCurrency(
        this.amount(),
        this.sourceCurrency(),
        this.targetCurrency()
      )
    );
  }
}
