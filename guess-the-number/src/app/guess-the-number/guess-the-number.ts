import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

const TOTAL_ATTEMPTS = 10;
const RANDOM_RANGE = 100;

@Component({
  selector: 'app-guess-the-number',
  imports: [CommonModule, FormsModule],
  templateUrl: './guess-the-number.html',
  styleUrl: './guess-the-number.scss',
})
export class GuessTheNumber {
  protected readonly secret = signal(this.generateRandomNumber());
  protected readonly attempts = signal(TOTAL_ATTEMPTS);
  protected readonly guessedNumber = signal<number | undefined>(undefined);
  protected readonly feedback = signal('');
  protected readonly gameOver = signal(false);

  protected readonly isValidGuess = computed(() => {
    const guess = this.guessedNumber();
    return guess !== undefined && guess >= 1 && guess <= RANDOM_RANGE;
  });

  protected submit(): void {
    if (!this.isValidGuess()) {
      this.feedback.set(`Enter a number between 1 and ${RANDOM_RANGE}`);
      return;
    }

    this.attempts.update((val) => --val);
    this.eval();
  }

  protected reset(): void {
    this.secret.set(this.generateRandomNumber());
    this.attempts.set(TOTAL_ATTEMPTS);
    this.guessedNumber.set(undefined);
    this.feedback.set('');
    this.gameOver.set(false);
  }

  private generateRandomNumber(): number {
    return Math.floor(Math.random() * RANDOM_RANGE) + 1;
  }

  private eval(): void {
    const guess = this.guessedNumber()!;

    if (guess === this.secret()) {
      this.endGame(true);
    } else if (this.attempts() === 0) {
      this.endGame(false);
    } else {
      this.feedback.set(guess > this.secret() ? 'Too High! Try again.' : 'Too low! Try again.');
    }
  }

  private endGame(isWin: boolean): void {
    this.gameOver.set(true);
    this.feedback.set(
      isWin
        ? 'Congratulations! You guessed the correct number!'
        : `Game over! The correct number was ${this.secret()}`
    );
  }
}
