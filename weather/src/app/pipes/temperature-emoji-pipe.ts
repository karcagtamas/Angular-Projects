import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatureEmoji',
})
export class TemperatureEmojiPipe implements PipeTransform {
  transform(temp: number | null | undefined): string {
    if (temp === null || temp === undefined) {
      return '';
    }

    if (temp <= 0) {
      return '❄';
    }

    if (temp > 0 && temp <= 10) {
      return '🌬️';
    }

    if (temp > 10 && temp <= 20) {
      return '🌤️';
    }

    if (temp > 20 && temp <= 30) {
      return '☀︎';
    }

    return '🔥';
  }
}
