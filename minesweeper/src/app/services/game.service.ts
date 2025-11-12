import { inject, Injectable, signal } from '@angular/core';
import { TimerService } from './timer.service';
import { CellDTO } from '../models/cell.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly timerService = inject(TimerService);

  protected readonly gridSize = 10;
  protected readonly mineCount = 10;
  grid: CellDTO[][] = [];
  gameOver = false;
  gameWon = false;

  winGame(): void {
    this.gameWon = true;
    this.gameOver = true;
    this.timerService.stop();
  }

  loseGame(): void {
    this.gameOver = true;
    this.timerService.stop();
  }

  revealCell(row: number, col: number): void {
    if (!this.canReveal(row, col)) {
      return;
    }

    this.grid[row][col].isRevealed = true;

    if (this.isMinePlaced(row, col)) {
      this.loseGame();
      return;
    }

    if (this.grid[row][col].adjacentMines === 0) {
      this.revealAdjacentCells(row, col);
    }
    this.checkWinCondition();
  }

  toggleFlag(row: number, col: number): void {
    if (this.gameOver) {
      return;
    }

    if (this.grid[row][col].isRevealed) {
      return;
    }

    this.grid[row][col].isFlagged = !this.grid[row][col].isFlagged;
  }

  initializeGame(): void {
    this.grid = this.createEmptyGrid();
    this.placeMines();
    this.calculateAdjacentMines();
    this.timerService.start();
  }

  private createEmptyGrid(): CellDTO[][] {
    return Array.from({ length: this.gridSize }, () => {
      return Array.from({ length: this.gridSize }, () => {
        return {
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          adjacentMines: 0,
        };
      });
    });
  }

  private isMinePlaced(row: number, col: number): boolean {
    return this.grid[row][col].isMine;
  }

  private generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private placeMines(): void {
    let placedMines = 0;

    while (placedMines < this.mineCount) {
      const row = this.generateRandomNumber(0, this.gridSize);
      const col = this.generateRandomNumber(0, this.gridSize);

      if (this.isMinePlaced(row, col)) {
        continue;
      }

      this.grid[row][col].isMine = true;
      placedMines++;
    }
  }

  private isValidCell(row: number, col: number): boolean {
    if (row < 0) {
      return false;
    }

    if (row >= this.gridSize) {
      return false;
    }

    if (col < 0) {
      return false;
    }

    if (col >= this.gridSize) {
      return false;
    }

    return true;
  }

  private getAdjacentCells(row: number, col: number): CellDTO[] {
    const adjacentCells: CellDTO[] = [];

    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
      for (let colOffset = -1; colOffset <= 1; colOffset++) {
        const adjacentRow = row + rowOffset;
        const adjacentCol = col + colOffset;

        if (rowOffset === 0 && colOffset === 0) {
          continue;
        }

        if (this.isValidCell(adjacentRow, adjacentCol)) {
          adjacentCells.push(this.grid[adjacentRow][adjacentCol]);
        }
      }
    }

    return adjacentCells;
  }

  private setCountAdjacentMines(row: number, col: number): number {
    const adjacentCells = this.getAdjacentCells(row, col);
    return adjacentCells.filter((cell) => cell.isMine).length;
  }

  private calculateAdjacentMines(): void {
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        if (this.isMinePlaced(row, col)) {
          continue;
        }

        this.grid[row][col].adjacentMines = this.setCountAdjacentMines(row, col);
      }
    }
  }

  private getGameStatus(): { revealedCells: number; hiddenNonMineCells: number } {
    let revealedCells = 0;
    let hiddenNonMineCells = 0;

    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        const cell = this.grid[row][col];

        if (cell.isRevealed) {
          revealedCells++;
        }

        if (!cell.isRevealed && !cell.isMine) {
          hiddenNonMineCells++;
        }
      }
    }

    return { revealedCells, hiddenNonMineCells };
  }

  private checkWinCondition(): void {
    const { hiddenNonMineCells } = this.getGameStatus();

    if (hiddenNonMineCells === 0) {
      this.winGame();
    }
  }

  private canReveal(row: number, col: number): boolean {
    if (this.gameOver) {
      return false;
    }

    if (this.grid[row][col].isRevealed) {
      return false;
    }

    if (this.grid[row][col].isFlagged) {
      return false;
    }

    return true;
  }

  private revealAdjacentCells(row: number, col: number): void {
    const cellsToReveal: { row: number; col: number }[] = [];

    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
      for (let colOffset = -1; colOffset <= 1; colOffset++) {
        if (rowOffset === 0 && colOffset === 0) {
          continue;
        }

        const adjacentRow = row + rowOffset;
        const adjacentCol = row + colOffset;

        if (!this.isValidCell(adjacentRow, adjacentCol)) {
          continue;
        }

        const cell = this.grid[adjacentRow][adjacentCol];

        if (cell.isRevealed || cell.isMine) {
          continue;
        }

        cellsToReveal.push({ row: adjacentRow, col: adjacentCol });
      }
    }

    cellsToReveal.forEach((cell) => this.revealCell(cell.row, cell.col));
  }
}
