import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserDTO } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-usercard',
  imports: [CommonModule, FormsModule],
  templateUrl: './usercard.html',
  styleUrl: './usercard.scss',
})
export class Usercard {
  private readonly userService = inject(UserService);

  readonly user = input.required<UserDTO>();

  protected readonly isEditModalOpen = signal(false);
  protected readonly editUser = signal<UserDTO>({
    id: 0,
    email: '',
    name: '',
    username: '',
    phone: '',
    website: '',
  });

  onEdit(): void {
    this.editUser.set({ ...this.user() });
    this.isEditModalOpen.set(true);
  }

  closeModal(): void {
    this.isEditModalOpen.set(false);
  }

  saveChanges(): void {
    const editUser = this.editUser();
    if (editUser) {
      this.userService.editUserById(this.user().id, editUser);
      this.isEditModalOpen.set(false);
    }
  }

  onDelete(): void {
    this.userService.deleteUser(this.user().id);
  }
}
