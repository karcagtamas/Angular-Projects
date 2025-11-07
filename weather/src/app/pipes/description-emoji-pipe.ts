import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionEmoji',
})
export class DescriptionEmojiPipe implements PipeTransform {
  transform(description: string | null | undefined): string {
    if (description === null || description === undefined) {
      return '';
    }

    const emojiMap: { [key: string]: string } = {
      'clear sky': '☀︎',
      'few clouds': '🌤️',
      'scattered clouds': '⛅',
      'broken clouds': '🌥️',
      'overcast clouds': '☁︎',
      'light rain': '🌦️',
      'moderate rain': '🌧️',
      'heavy intensity rain': '🌧️💦',
      thunderstorm: '⛈️',
      snow: '❄️',
      mist: '🌫️',
    };

    return emojiMap[description] || '❓';
  }
}
