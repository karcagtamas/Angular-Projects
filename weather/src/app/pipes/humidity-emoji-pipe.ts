import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'humidityEmoji',
})
export class HumidityEmojiPipe implements PipeTransform {
  transform(humidity: number | null | undefined): string {
    if (humidity === null || humidity === undefined) {
      return '';
    }

    if (humidity < 30) {
      return '🌵';
    }

    if (humidity >= 30 && humidity <= 60) {
      return '☁';
    }

    return '💧';
  }
}
