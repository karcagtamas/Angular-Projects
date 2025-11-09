import { Component, inject } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkers',
  imports: [CommonModule],
  templateUrl: './checkers.html',
  styleUrl: './checkers.scss',
})
export class Checkers {
  protected readonly gameService = inject(GameService);

  constructor() {
    this.gameService.initializeBoard();
  }

  protected isSelected(rowIndex: number, colIndex: number): boolean {
    return (
      this.gameService.selectedPiece?.row === rowIndex &&
      this.gameService.selectedPiece?.col === colIndex
    );
  }

  protected onCellClick(rowIndex: number, colIndex: number): void {
    if (this.gameService.gameOver) {
      return;
    }

    if (this.gameService.selectedPiece) {
      this.gameService.movePiece(rowIndex, colIndex);
    } else {
      this.gameService.selectPiece(rowIndex, colIndex);
    }
  }

  protected resetGame(): void {
    this.gameService.initializeBoard();
  }
}
