import { Component, inject } from '@angular/core';
import { Button } from '../../components/button/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  imports: [Button],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  private readonly router = inject(Router);

  protected navigate(): void {
    this.router.navigate(['/contact']);
  }
}
