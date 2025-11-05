import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockTimeService {
  private mockDate: Date = new Date();

  constructor() {
    this.mockDate.setHours(3, 50, 0);
  }

  getCurrentTime(): Date {
    return this.mockDate;
  }
}
