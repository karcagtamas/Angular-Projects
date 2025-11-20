import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, signal } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements AfterViewInit {
  protected readonly showContent = signal(false);

  ngAfterViewInit(): void {
    setTimeout(() => this.showContent.set(true));
  }
}
