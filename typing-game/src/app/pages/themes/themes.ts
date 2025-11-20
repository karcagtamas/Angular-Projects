import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-themes',
  imports: [CommonModule],
  templateUrl: './themes.html',
  styleUrl: './themes.scss',
})
export class Themes implements AfterViewInit {
  private readonly themeService = inject(ThemeService);
  protected readonly showContent = signal(false);
  protected readonly themes = [
    {
      name: 'default',
      displayName: 'Default Theme',
      colors: ['#000000', '#333333', '#ffffff'],
    },
    {
      name: 'ocean-blue',
      displayName: 'Ocean Blue Theme',
      colors: ['#001f3d', '#003366', '#8ab4f8'],
    },
    {
      name: 'dark-blue',
      displayName: 'Dark Blue Theme',
      colors: ['#000', '#000033', '#0000ad'],
    },
    {
      name: 'dark-red',
      displayName: 'Dark Red Theme',
      colors: ['#000', '#330000', '#160000'],
    },
    {
      name: 'cyberpunk',
      displayName: 'Cyperpunk Neon',
      colors: ['#1a1a1a', '#5b005b', '#00ffff'],
    },
    {
      name: 'galaxy',
      displayName: 'Galaxy',
      colors: ['#0d0d1c', '#2a2a44', '#12122e'],
    },
    {
      name: 'light-grey',
      displayName: 'Light Grey Theme',
      colors: ['#ffffff', '#dddddd', '#606060'],
    },
    {
      name: 'pink',
      displayName: 'Pink Theme',
      colors: ['#ffe6f0', '#ff66b2', '#ff1493'],
    },
  ];

  ngAfterViewInit(): void {
    setTimeout(() => this.showContent.set(true));
  }

  protected selectTheme(themeName: string): void {
    this.themeService.setTheme(themeName);
  }
}
