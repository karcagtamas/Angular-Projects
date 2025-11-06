import { Directive, ElementRef, HostListener, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverHighlight]',
})
export class HoverHighlightDirective {
  private readonly el = inject(ElementRef); // Give acces to the dom element this directive is applied to
  private readonly renderer = inject(Renderer2); // Modifies dom properties and styles like background

  highlightColor = input('yellow');
  defaultColor = input('transparent');

  private setBackgroundColor(color: string): void {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.setBackgroundColor(this.highlightColor());
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.setBackgroundColor(this.defaultColor());
  }
}
