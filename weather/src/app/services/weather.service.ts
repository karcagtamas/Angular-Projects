import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type WeatherDataDTO = {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
};

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly apiUrl = 'https://api.openweathermap.org/data/2.5';
  private readonly http = inject(HttpClient);

  getWeather(city: string): Observable<WeatherDataDTO> {
    return this.http.get<WeatherDataDTO>(
      `${this.apiUrl}/weather?q=${city}&appid=${environment.weatherApiKey}&units=metric`
    );
  }
}
