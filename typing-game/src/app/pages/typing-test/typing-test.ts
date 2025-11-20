import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GameStats } from '../../components/typing-test/game-stats/game-stats';
import { InputRow } from '../../components/typing-test/input-row/input-row';
import { WordDisplay } from '../../components/typing-test/word-display/word-display';
import { GameService } from '../../services/game/game.service';

@Component({
  selector: 'app-typing-test',
  imports: [CommonModule, GameStats, InputRow, WordDisplay],
  templateUrl: './typing-test.html',
  styleUrl: './typing-test.scss',
})
export class TypingTest implements OnInit, OnDestroy {
  private readonly gameService = inject(GameService);

  ngOnInit(): void {
    this.gameService.getWords().subscribe();
  }

  ngOnDestroy(): void {
    this.gameService.resetGame();
    console.log('Game reset on component destruction');
  }
}
