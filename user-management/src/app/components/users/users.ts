import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Usercard } from '../usercard/usercard';
import { UserService } from '../../services/user.service';
import { UserDTO } from '../../models/user.model';
import { firstValueFrom, Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [CommonModule, Usercard],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit, OnDestroy {
  protected readonly userService = inject(UserService);
  protected readonly users = signal<UserDTO[]>([]);

  private subs = new Subscription();

  ngOnInit(): void {
    firstValueFrom(this.userService.fetchUsers()).then((res) => this.users.set(res));
    this.subs.add(
      this.userService.subscription().subscribe(() => {
        this.users.set(this.userService.getUsers());
      })
    );
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }

  protected onDeleteUser(userId: number): void {
    this.userService.deleteUser(userId);
  }

  protected onAddUser(newUser: Partial<UserDTO>): void {
    this.userService.addUser(newUser);
  }

  protected onUpdateUser(updatedUser: UserDTO): void {
    this.userService.editUserById(updatedUser.id, updatedUser);
  }
}
