import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { StatsService } from '../../../services/game/stats.service';
import { Subscription } from 'rxjs';
import { Stats } from '../../../models/stats.model';

@Component({
  selector: 'app-game-stats',
  imports: [CommonModule],
  templateUrl: './game-stats.html',
  styleUrl: './game-stats.scss',
})
export class GameStats implements OnInit, AfterViewInit, OnDestroy {
  private readonly statsService = inject(StatsService);

  protected readonly showContent = signal(false);
  protected readonly showStats = signal(false);
  protected readonly stats = signal<Stats>({
    cleanSpeed: 0,
    rawSpeed: 0,
    accuracy: 0,
    allWords: 0,
    incorrectWords: 0,
    allLetters: 0,
    incorrectLetters: 0,
  });

  private subs = new Subscription();

  ngOnInit(): void {
    this.subs.add(
      this.statsService.stats$.subscribe((stats) => {
        this.stats.set(stats);
      })
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.showContent.set(true), 10);
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }

  protected toggleStatus(): void {
    this.showStats.update((v) => !v);
  }
}
