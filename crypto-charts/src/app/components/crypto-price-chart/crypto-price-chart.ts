import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { firstValueFrom, Subscription } from 'rxjs';
import { CryptoPriceService } from '../../services/crypto-price.service';

Chart.register(...registerables);

@Component({
  selector: 'app-crypto-price-chart',
  imports: [],
  templateUrl: './crypto-price-chart.html',
  styleUrl: './crypto-price-chart.scss',
})
export class CryptoPriceChart implements OnInit, OnDestroy {
  private readonly cryptoPriceService = inject(CryptoPriceService);
  private sub?: Subscription;
  protected chart?: Chart;

  ngOnInit(): void {
    this.updateChart();
    this.sub = this.cryptoPriceService.getUpdated$().subscribe(() => {
      this.updateChart();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.chart?.destroy();
  }

  updateChart(): void {
    firstValueFrom(this.cryptoPriceService.getCryptoPriceData()).then((data) => {
      const labels = data.prices.map((price: [number, number]) =>
        new Date(price[0]).toLocaleDateString()
      );

      const prices = data.prices.map((price: [number, number]) => price[1]);

      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart('cryptoChart', {
        type: 'line',

        data: {
          labels: labels,

          datasets: [
            {
              label: `${this.cryptoPriceService.coin} price (${this.cryptoPriceService.currency})`, // Dynamic label for the dataset
              data: prices, // Set the y-axis data as the extracted prices
              borderColor: 'rgb(75, 192, 192)', // Line color
              fill: false, // No fill under the line
              tension: 0.1, // Set the line curve tension for a smoother look
            },
          ],
        },

        options: {
          responsive: true, // Make the chart responsive to the container's size
          scales: {
            y: {
              beginAtZero: false, // Do not force the y-axis to start at zero (allow dynamic range)
            },
          },
        },
      });
    });
  }
}
