import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Display } from '../display/display';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'app-calculator',
  imports: [CommonModule, Display],
  templateUrl: './calculator.html',
  styleUrl: './calculator.scss',
})
export class Calculator {
  private readonly calculatorService = inject(CalculatorService);

  protected readonly operators = ['+', '-', '*', '/'];
  protected readonly layout = [
    ['1', '2', '3', '+'],
    ['4', '5', '6', '-'],
    ['7', '8', '9', '*'],
    ['C', '0', '=', '/'],
  ];

  protected get display(): string {
    return this.calculatorService.getDisplay();
  }

  protected handleInput(input: string): void {
    this.calculatorService.handleInput(input);
  }
}
