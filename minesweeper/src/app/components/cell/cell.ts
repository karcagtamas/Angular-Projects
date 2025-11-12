import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { CellDTO } from '../../models/cell.model';

@Component({
  selector: 'app-cell',
  imports: [CommonModule],
  templateUrl: './cell.html',
  styleUrl: './cell.scss',
})
export class Cell {
  readonly row = input.required<number>();
  readonly col = input.required<number>();
  readonly cell = input.required<CellDTO>();

  readonly cellClicked = output<{ row: number; col: number }>();
  readonly cellFlagged = output<{ row: number; col: number }>();

  onLeftClick(): void {
    this.cellClicked.emit({ row: this.row(), col: this.col() });
  }

  onRightClick(event: MouseEvent): void {
    event.preventDefault();
    this.cellFlagged.emit({ row: this.row(), col: this.col() });
  }
}
