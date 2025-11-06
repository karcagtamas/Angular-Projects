import { AfterViewInit, Directive, ElementRef, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFocusOn]',
})
export class FocusOnDirective implements AfterViewInit {
  private readonly el = inject(ElementRef); // Give acces to the dom element this directive is applied to
  private readonly renderer = inject(Renderer2); // Modifies dom properties and styles like background

  ngAfterViewInit(): void {
    this.el.nativeElement.focus();
  }
}
