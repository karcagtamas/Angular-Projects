import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserDTO } from '../models/user.model';
import { map, Observable, Subject } from 'rxjs';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private _users: UserDTO[] = [];

  private _subject = new Subject<void>();

  subscription(): Observable<void> {
    return this._subject.asObservable();
  }

  fetchUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(API_URL).pipe(
      map((res) => {
        this._users = res.map((r) => ({ ...r }));
        return this._users;
      })
    );
  }

  getUsers(): UserDTO[] {
    return this._users;
  }

  addUser(newUser: Partial<UserDTO>): void {
    const userId = Math.max(0, ...this._users.map((user) => user.id)) + 1;
    const userInstance = {
      ...newUser,
      id: userId,
    } as UserDTO;
    this._users.push(userInstance);
    this._subject.next();
  }

  deleteUser(userId: number): void {
    this._users = this._users.filter((user) => user.id !== userId);
    this._subject.next();
  }

  findUserById(userId: number): UserDTO | undefined {
    return this._users.find((user) => user.id === userId);
  }

  editUserById(userId: number, updateUser: Partial<UserDTO>): UserDTO | undefined {
    const user = this.findUserById(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found.`);
    }

    Object.assign(user, updateUser);
    this._subject.next();
    return user;
  }
}
