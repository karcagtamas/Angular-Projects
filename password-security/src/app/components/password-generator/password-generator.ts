import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordGeneratorService } from '../../services/password-generator.service';
import { EntropyService } from '../../services/entropy.service';

type Strength = 'Very Weak' | 'Weak' | 'Strong' | 'Very Strong';

type GeneratedPassword = {
  password: string;
  entropy: number;
  strength: Strength;
};

@Component({
  selector: 'app-password-generator',
  imports: [CommonModule, FormsModule],
  templateUrl: './password-generator.html',
  styleUrl: './password-generator.scss',
})
export class PasswordGenerator {
  private readonly passwordGeneratorService = inject(PasswordGeneratorService);
  private readonly entropyService = inject(EntropyService);

  protected readonly length = signal(12);
  protected readonly includeUppercase = signal(false);
  protected readonly includeNumbers = signal(false);
  protected readonly includeSpecialChars = signal(false);
  protected readonly generatedPassword = signal<GeneratedPassword | null>(null);
  protected readonly strengthColor = computed(() => {
    if (this.generatedPassword()) {
      switch (this.generatedPassword()!.strength) {
        case 'Very Weak':
          return 'red';
        case 'Weak':
          return 'orange';
        case 'Strong':
          return 'green';
        case 'Very Strong':
          return 'darkgreen';
      }
    }

    return null;
  });
  protected readonly strengthWidth = computed(() => {
    if (this.generatedPassword()) {
      const maxEntropy = 120;
      const normalizedEntropy = Math.min(this.generatedPassword()!.entropy, maxEntropy);

      return (normalizedEntropy / maxEntropy) * 100;
    }

    return null;
  });

  protected generatePassword(): void {
    const { password } = this.passwordGeneratorService.generatePassword(
      this.length(),
      this.includeUppercase(),
      this.includeNumbers(),
      this.includeSpecialChars()
    );

    this.updatePassword(password);
  }

  protected getPasswordStrength(entropy: number): Strength {
    if (entropy < 36) {
      return 'Very Weak';
    } else if (entropy < 60) {
      return 'Weak';
    } else if (entropy < 120) {
      return 'Strong';
    } else {
      return 'Very Strong';
    }
  }

  protected onPasswordChange(newPassword: string): void {
    if (!newPassword) {
      this.generatedPassword.set(null);
      return;
    }

    this.updatePassword(newPassword);
  }

  protected updatePassword(password: string): void {
    const entropy = this.entropyService.calculatePasswordEntropy(password);
    const strength = this.getPasswordStrength(entropy);
    this.generatedPassword.set({
      password,
      entropy,
      strength,
    });
  }

  protected copyToClipboard(): void {
    navigator.clipboard.writeText(this.generatedPassword()?.password ?? '').then(() => {
      alert('Password copied to clipboard');
    });
  }
}
