import { Component, inject, OnInit, signal } from '@angular/core';
import { HistoryModel } from '../../models/history.model';
import { HistoryService } from '../../services/history.service';
import { CustomDatePipe } from '../../pipes/custom-date-pipe';

@Component({
  selector: 'app-history-page',
  imports: [CustomDatePipe],
  templateUrl: './history-page.html',
  styleUrl: './history-page.scss',
})
export class HistoryPage implements OnInit {
  private readonly historyService = inject(HistoryService);

  protected readonly history = signal<HistoryModel[]>([]);

  ngOnInit(): void {
    this.history.set(this.historyService.getHistory());
  }
}
