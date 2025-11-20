import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { GameService } from '../../../services/game/game.service';

@Component({
  selector: 'app-word-display',
  imports: [CommonModule],
  templateUrl: './word-display.html',
  styleUrl: './word-display.scss',
})
export class WordDisplay implements AfterViewInit {
  protected readonly gameService = inject(GameService);
  protected readonly showContent = signal(false);

  ngAfterViewInit(): void {
    setTimeout(() => this.showContent.set(true), 10);
  }
}
