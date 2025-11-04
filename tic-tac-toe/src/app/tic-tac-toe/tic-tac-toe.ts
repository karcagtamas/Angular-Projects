import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  imports: [],
  templateUrl: './tic-tac-toe.html',
  styleUrl: './tic-tac-toe.scss',
})
export class TicTacToe {
  protected readonly board = signal<string[]>(Array(9).fill(''));
  protected readonly currentPlayer = signal('X');
  protected readonly winner = signal<string | null>(null);
  protected readonly isDraw = signal(false);

  protected readonly isGameOver = computed(() => {
    return this.winner() !== null || this.isDraw();
  });
  protected readonly isBoardFull = computed(() => {
    return this.board().every((cell) => cell !== '');
  });

  protected checkWinner(): boolean {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningCombinations.some(([a, b, c]) => {
      return (
        this.board()[a] &&
        this.board()[a] === this.board()[b] &&
        this.board()[a] === this.board()[c]
      );
    });
  }

  protected makeMove(index: number): void {
    if (this.isMoveInvalid(index)) {
      return;
    }

    this.board.update((board) => {
      return [...board.slice(0, index), this.currentPlayer(), ...board.slice(index + 1)];
    });
    this.updateGameState(index);
  }

  protected resetGame(): void {
    this.board.set(Array(9).fill(''));
    this.currentPlayer.set('X');
    this.winner.set(null);
    this.isDraw.set(false);
  }

  private isCellOccupied(index: number): boolean {
    return this.board()[index] !== '';
  }

  private isMoveInvalid(index: number): boolean {
    return this.isCellOccupied(index) || this.isGameOver();
  }

  private switchPlayer(): void {
    this.currentPlayer.update((value) => {
      return value === 'X' ? 'O' : 'X';
    });
  }

  private updateGameState(index: number): void {
    if (this.checkWinner()) {
      this.winner.set(this.currentPlayer());
    } else if (this.isBoardFull()) {
      this.isDraw.set(true);
    } else {
      this.switchPlayer();
    }
  }
}
