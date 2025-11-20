import { inject, Injectable, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly rendererFactory = inject(RendererFactory2);
  private readonly renderer = this.rendererFactory.createRenderer(null, null);
  private currentTheme = 'default';

  setTheme(theme: string): void {
    const htmlElement = document.documentElement;
    this.renderer.setAttribute(htmlElement, 'data-theme', theme);
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
  }

  loadTheme(): void {
    const savedTheme = localStorage.getItem('theme') || 'default';
    this.setTheme(savedTheme);
  }

  getTheme(): string {
    return this.currentTheme;
  }
}
