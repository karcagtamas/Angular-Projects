import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserDTO } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-userform',
  imports: [CommonModule, FormsModule],
  templateUrl: './userform.html',
  styleUrl: './userform.scss',
})
export class Userform {
  private readonly userService = inject(UserService);
  protected newUser = signal<Partial<UserDTO>>({});

  protected onSubmit(userForm: NgForm): void {
    this.userService.addUser(this.newUser());
    this.newUser.set({});
    userForm.resetForm();
  }
}
