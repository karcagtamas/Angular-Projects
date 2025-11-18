import { Injectable } from '@angular/core';
import { HistoryModel } from '../models/history.model';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private history: HistoryModel[] = [];

  constructor() {
    this.loadHistoryFromLocalStorage();
  }

  addHistoryEntry(quizTitle: string, score: number, maxScore: number): void {
    const newHistory = { quizTitle, score, maxScore, date: new Date() } as HistoryModel;
    this.history.push(newHistory);
    this.saveHistoryToLocalStorage();
    console.log('History entry added: ', newHistory);
  }

  getHistory(): HistoryModel[] {
    return this.history.slice().sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  private getHistoryFromLocalStorage(): string | null {
    return localStorage.getItem('quizHistory');
  }

  private parseHistoryData(historyData: string): HistoryModel[] {
    return JSON.parse(historyData) as HistoryModel[];
  }

  private ensureDatesAreParsed(): void {
    this.history.forEach((entry) => {
      if (entry.date && !(entry.date instanceof Date)) {
        entry.date = new Date(entry.date);
      }
    });
  }

  private loadHistoryFromLocalStorage(): void {
    const historyData = this.getHistoryFromLocalStorage();

    if (!historyData) {
      return;
    }

    try {
      this.history = this.parseHistoryData(historyData);
      this.ensureDatesAreParsed();
    } catch (err) {
      console.error('Error parsing history from localStorage', err);
      this.history = [];
    }
  }

  private saveHistoryToLocalStorage(): void {
    try {
      localStorage.setItem('quizHistory', JSON.stringify(this.history));
    } catch (err) {
      console.error('Error saving history to localStorage', err);
    }
  }
}
