import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string | number | Date, format: string = 'short'): string {
    if (!value) {
      return '';
    }
    const date = new Date(value);

    if (format === 'short') {
      const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad it to 2 digits.
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-based) and pad it to 2 digits.
      const year = date.getFullYear(); // Get the full year.
      const hours = String(date.getHours()).padStart(2, '0'); // Get the hours and pad it to 2 digits.
      const minutes = String(date.getMinutes()).padStart(2, '0'); // Get the minutes and pad it to 2 digits.

      // Return the formatted string in 'HH:mm DD/MM/YYYY' format.
      return `${hours}:${minutes} ${day}/${month}/${year}`;
    }

    return value.toString();
  }
}
