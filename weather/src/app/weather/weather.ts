import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WeatherDataDTO, WeatherService } from '../services/weather.service';
import { firstValueFrom } from 'rxjs';
import { TemperatureEmojiPipe } from '../pipes/temperature-emoji-pipe';
import { HumidityEmojiPipe } from '../pipes/humidity-emoji-pipe';
import { DescriptionEmojiPipe } from '../pipes/description-emoji-pipe';

@Component({
  selector: 'app-weather',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TemperatureEmojiPipe,
    HumidityEmojiPipe,
    DescriptionEmojiPipe,
  ],
  templateUrl: './weather.html',
  styleUrl: './weather.scss',
})
export class Weather {
  private readonly fb = inject(FormBuilder);
  private readonly weatherService = inject(WeatherService);

  protected readonly weatherForm: FormGroup = this.fb.group({
    city: [''],
  });
  protected readonly weatherData = signal<WeatherDataDTO | null>(null);
  protected readonly temperatureEmoji = signal<string | null>(null);
  protected readonly humidityEmoji = signal<string | null>(null);
  protected readonly isLoading = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly description = computed(() => {
    return this.weatherData()?.weather[0]?.description;
  });

  protected fetchWeather(): void {
    this.error.set('');
    this.isLoading.set(true);
    const city = this.weatherForm.value.city;

    if (!city) {
      this.isLoading.set(false);
      this.error.set('Please enter a city name or use your location.');
      return;
    }

    firstValueFrom(this.weatherService.getWeather(city))
      .then((res) => {
        this.weatherData.set(res);
      })
      .catch(() => {
        this.error.set('City not found or API error.');
      })
      .finally(() => {
        this.isLoading.set(false);
      });
  }
}
