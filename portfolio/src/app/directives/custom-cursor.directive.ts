import { Directive, ElementRef, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCustomCursor]',
})
export class CustomCursorDirective implements OnInit, OnDestroy {
  private readonly renderer = inject(Renderer2);
  private readonly el = inject(ElementRef);

  private cursorBig!: HTMLElement;

  ngOnInit(): void {
    this.initCursor();
  }

  ngOnDestroy(): void {
    window.removeEventListener('mousemove', this.positionElement);
    window.removeEventListener('mousedown', this.enlargeCursor);
    window.removeEventListener('mouseup', this.shrinkCursor);

    if (this.cursorBig) {
      this.renderer.removeChild(document.body, this.cursorBig);
    }
  }

  private isMobile(): boolean {
    if (/Android/i.test(navigator.userAgent) || /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      return true;
    }

    return false;
  }

  private initCursor(): void {
    if (this.isMobile()) {
      return;
    }

    this.cursorBig = this.renderer.createElement('div');
    this.cursorBig.className = 'big-cursor';
    this.renderer.appendChild(document.body, this.cursorBig);

    window.addEventListener('mousemove', this.positionElement);
    window.addEventListener('mousedown', this.enlargeCursor);
    window.addEventListener('mouseup', this.shrinkCursor);
  }

  private positionElement = (event: MouseEvent): void => {
    const mouseY = event.clientY - 20;
    const mouseX = event.clientX - 20;

    this.cursorBig.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  };

  private enlargeCursor = (): void => {
    this.cursorBig.style.transform += 'scale(1.3)';
    this.cursorBig.style.transform = 'transform 0.08s ease';
  };

  private shrinkCursor = (): void => {
    this.cursorBig.style.transform = this.cursorBig.style.transform.replace('scale(1.3)', '');
    this.cursorBig.style.transition = 'transform 0.08s ease';
  };
}
