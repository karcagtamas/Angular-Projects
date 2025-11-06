import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  private readonly el = inject(ElementRef);

  @HostListener('document:click', ['$event']) onClick(event: Event): void {
    if (this.el.nativeElement.contains(event.target)) {
      console.log('Clicked inside the element!');
    } else {
      console.log('Clicked outside the element!');
    }
  }
}
