import { Directive, ElementRef, inject, input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTextTransform]',
})
export class TextTransformDirective implements OnInit {
  private readonly el = inject(ElementRef); // Give acces to the dom element this directive is applied to
  private readonly renderer = inject(Renderer2); // Modifies dom properties and styles like background

  transformType = input<'uppercase' | 'lowercase'>('uppercase');

  ngOnInit(): void {
    const text = this.el.nativeElement.innerText;
    this.setTextTransform(text);
  }

  private setTextTransform(text: string): void {
    if (this.transformType() === 'uppercase') {
      this.renderer.setProperty(this.el.nativeElement, 'innerText', text.toUpperCase());
    } else {
      this.renderer.setProperty(this.el.nativeElement, 'innerText', text.toLowerCase());
    }
  }
}
