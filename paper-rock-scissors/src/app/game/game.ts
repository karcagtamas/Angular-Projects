import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game {
  protected readonly choices = ['Rock', 'Paper', 'Scissors'];

  protected readonly playerChoice = signal<string | null>(null);
  protected readonly computerChoice = signal<string | null>(null);
  protected readonly result = signal<string | null>(null);

  private getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }

  private determineWinner(player: string | null, computer: string | null): string | null {
    if (player === null || computer === null) {
      return null;
    }

    if (player === computer) {
      return "It's a tie!";
    }

    if (
      (player === 'Rock' && computer === 'Scissors') ||
      (player === 'Paper' && computer === 'Rock') ||
      (player === 'Scissors' && computer === 'Paper')
    ) {
      return 'You win!';
    }

    return 'You lose!';
  }

  protected play(choice: string): void {
    this.playerChoice.set(choice);
    this.computerChoice.set(this.choices[this.getRandomNumber(this.choices.length)]);
    this.result.set(this.determineWinner(this.playerChoice(), this.computerChoice()));
  }
}
