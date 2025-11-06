import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HoverHighlightDirective } from './directives/hover-highlight.directive';
import { TextTransformDirective } from './directives/text-transform.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { FocusOnDirective } from './directives/focus-on.directive';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    HoverHighlightDirective,
    TextTransformDirective,
    ClickOutsideDirective,
    FocusOnDirective,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
