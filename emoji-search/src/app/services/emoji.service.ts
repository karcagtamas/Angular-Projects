import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Emoji } from '../models/emoji.model';

@Injectable({
  providedIn: 'root',
})
export class EmojiService {
  private readonly http = inject(HttpClient);

  private readonly url = 'emojis.json';

  getEmojis(): Observable<Emoji[]> {
    return this.http.get<Emoji[]>(this.url);
  }

  getCategories(emojis: Emoji[]): string[] {
    return [...new Set(emojis.map((e) => e.category))];
  }
}
