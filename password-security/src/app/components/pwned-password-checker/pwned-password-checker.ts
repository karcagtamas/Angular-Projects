import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PwnedPasswordCheckerService } from '../../services/pwned-password-checker.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-pwned-password-checker',
  imports: [CommonModule, FormsModule],
  templateUrl: './pwned-password-checker.html',
  styleUrl: './pwned-password-checker.scss',
})
export class PwnedPasswordChecker {
  private readonly passwordCheckerService = inject(PwnedPasswordCheckerService);
  protected readonly password = signal('');
  protected readonly passwordStatus = signal<boolean | null | 'error'>(null);

  protected checkPassword() {
    if (!this.password()) {
      return;
    }

    firstValueFrom(this.passwordCheckerService.checkPassword(this.password())).then((status) =>
      this.passwordStatus.set(status)
    );
  }

  protected onPasswordInput() {
    this.passwordStatus.set(null);
  }
}
