import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type JokeDTO = {
  setup: string;
  punchline: string;
};

@Injectable({
  providedIn: 'root',
})
export class JokeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://official-joke-api.appspot.com/jokes/random';

  getRandomJoke(): Observable<JokeDTO> {
    return this.http.get<JokeDTO>(this.apiUrl);
  }
}
