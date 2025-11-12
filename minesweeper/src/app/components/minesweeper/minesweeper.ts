import { Component, inject, OnInit } from '@angular/core';
import { Timer } from '../timer/timer';
import { GameService } from '../../services/game.service';
import { Cell } from '../cell/cell';

@Component({
  selector: 'app-minesweeper',
  imports: [Timer, Cell],
  templateUrl: './minesweeper.html',
  styleUrl: './minesweeper.scss',
})
export class Minesweeper implements OnInit {
  protected readonly gameService = inject(GameService);

  ngOnInit(): void {
    this.gameService.initializeGame();
  }

  protected onCellClick(event: { row: number; col: number }): void {
    this.gameService.revealCell(event.row, event.col);
  }

  protected onCellFlagged(event: { row: number; col: number }): void {
    this.gameService.toggleFlag(event.row, event.col);
  }
}
