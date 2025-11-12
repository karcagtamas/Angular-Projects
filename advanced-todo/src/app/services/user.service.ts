import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserDTO } from '../models/user.model';
import { catchError, map, Observable } from 'rxjs';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  private users: UserDTO[] = [];

  getUsers(): UserDTO[] {
    return this.users;
  }

  fetchUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(API_URL).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occured: ', error);
        throw new Error('Error occured while fetching users');
      })
    );
  }

  findUserById(userId: number): Observable<UserDTO | undefined> {
    return this.http.get<UserDTO[]>(`${API_URL}?id=${userId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occured: ', error);
        throw new Error('Error occured while finding users');
      }),
      map((users) => (users.length > 0 ? users[0] : undefined))
    );
  }
}
