import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit {
  protected readonly showContent = signal(false);

  ngAfterViewInit(): void {
    setTimeout(() => this.showContent.set(true));
  }
}
