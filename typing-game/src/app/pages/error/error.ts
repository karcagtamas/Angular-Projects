import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [CommonModule, RouterModule],
  templateUrl: './error.html',
  styleUrl: './error.scss',
})
export class Error implements AfterViewInit {
  protected readonly showContent = signal(false);

  ngAfterViewInit(): void {
    setTimeout(() => this.showContent.set(true));
  }
}
