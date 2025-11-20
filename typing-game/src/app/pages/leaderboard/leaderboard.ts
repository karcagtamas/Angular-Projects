import { AfterViewInit, Component, computed, inject, OnInit, signal } from '@angular/core';
import { LeaderboardEntry } from '../../models/leader-entry.model';
import { LeaderboardService } from '../../services/leaderboard.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  imports: [],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.scss',
})
export class Leaderboard implements OnInit, AfterViewInit {
  private readonly leaderboardService = inject(LeaderboardService);
  protected readonly showContent = signal(false);
  protected readonly leaderboard = signal<LeaderboardEntry[]>([]);
  protected readonly currentPage = signal(1);
  protected readonly pageSize = signal(10);
  protected readonly totalRecords = signal(0);
  protected readonly totalPages = computed(() => {
    return Math.ceil(this.totalRecords() / this.pageSize());
  });
  protected readonly showLeaderboardMessage = signal(false);

  ngOnInit(): void {
    this.loadLeaderboardCount();
    this.loadPage(this.currentPage());
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.showContent.set(true));
  }

  protected nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((v) => v + 1);
      this.loadPage(this.currentPage());
    }
  }

  protected previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((v) => v - 1);
      this.loadPage(this.currentPage());
    }
  }

  private loadLeaderboardCount(): void {
    firstValueFrom(this.leaderboardService.getCount())
      .then((res) => {
        this.totalRecords.set(res.totalRecords);
        this.showLeaderboardMessage.set(true);
      })
      .catch((err) => {
        console.error('Error fetching leaderboard count: ', err);
        this.showLeaderboardMessage.set(true);
      });
  }

  private loadPage(page: number): void {
    const start = (page - 1) * this.pageSize();
    const limit = this.pageSize();
    firstValueFrom(this.leaderboardService.getLeaderboard(start, limit)).then((res) =>
      this.leaderboard.set(res)
    );
  }
}
