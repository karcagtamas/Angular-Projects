import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GameService } from '../../../services/game/game.service';

@Component({
  selector: 'app-input-row',
  imports: [CommonModule],
  templateUrl: './input-row.html',
  styleUrl: './input-row.scss',
})
export class InputRow implements AfterViewInit {
  private readonly gameService = inject(GameService);
  protected readonly wordInput = viewChild.required<ElementRef<HTMLInputElement>>('wordInput');
  protected readonly showContent = signal(false);

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showContent.set(true);
    }, 20);
  }

  protected onInputChange(): void {
    const userInput = this.wordInput().nativeElement.value;
    this.gameService.updateUserInput(userInput);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const userInput = this.wordInput().nativeElement.value;

    if (!this.gameService.gameStarted) {
      this.gameService.startGame();
    }

    this.gameService.updateUserInput(userInput);

    if (event.key === ' ') {
      event.preventDefault();
      this.gameService.onNextWord();
      this.resetInput();
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      this.gameService.resetGame();
      this.resetInput();
      return;
    }

    if (event.key === 'Backspace' && event.ctrlKey) {
      this.gameService.removeAllStylingFromCurrentWord();
      this.resetInput();
      return;
    }

    if (event.key === 'Backspace') {
      this.gameService.removeLastCharacterStyling();
    }
  }

  protected onRedoClick(): void {
    this.gameService.resetGame();
    this.resetInput();
  }

  private resetInput(): void {
    if (this.wordInput()) {
      this.wordInput().nativeElement.value = '';
    }

    this.gameService.updateUserInput('');
  }
}
