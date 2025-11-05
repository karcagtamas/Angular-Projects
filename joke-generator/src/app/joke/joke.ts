import { Component, inject, signal } from '@angular/core';
import { JokeDTO, JokeService } from '../services/joke.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-joke',
  imports: [],
  templateUrl: './joke.html',
  styleUrl: './joke.scss',
})
export class Joke {
  private readonly jokeService = inject(JokeService);

  protected readonly joke = signal<JokeDTO | null>(null);
  protected readonly isLoading = signal<boolean>(false);
  protected readonly error = signal('');

  protected fetchJoke(): void {
    this.isLoading.set(true);
    this.error.set('');

    firstValueFrom(this.jokeService.getRandomJoke())
      .then((res) => {
        this.joke.set(res);
      })
      .catch((err) => {
        this.error.set('Failed to fetch a joke. Please try again!');
        this.joke.set(null);
      })
      .finally(() => {
        this.isLoading.set(false);
      });
  }
}
