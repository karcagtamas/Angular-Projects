import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type PostDTO = {
  title: string;
  body: string;
};

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/posts';

  private readonly http = inject(HttpClient);

  getPosts(page: number, limit: number): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(`${this.API_URL}?_page=${page}&_limit=${limit}`);
  }
}
