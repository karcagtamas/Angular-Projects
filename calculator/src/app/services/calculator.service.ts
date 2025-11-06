import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private currentOperand: string = '';
  private previousOperand: string = '';
  private operator: string | null = null;

  getDisplay(): string {
    const previous = this.previousOperand || '';
    const operator = this.operator || '';
    const current = this.currentOperand || '';

    return previous + operator + current;
  }

  handleInput(input: string): void {
    if (this.isOperator(input)) {
      this.handleOperator(input);
    } else if (input === 'C') {
      this.clearCalculator();
    } else if (input === '=') {
      this.calculate();
    } else {
      this.handleNumber(input);
    }
  }

  private isOperator(input: string): boolean {
    return ['+', '-', '*', '/'].includes(input);
  }

  private clearCalculator(): void {
    this.currentOperand = '';
    this.clearOperation();
  }

  private clearOperation(): void {
    this.previousOperand = '';
    this.operator = null;
  }

  private handleNumber(num: string): void {
    this.currentOperand += num;
  }

  private calculate(): void {
    if (!this.previousOperand || !this.currentOperand || !this.operator) {
      return;
    }

    const previousValue = parseFloat(this.previousOperand);
    const currentValue = parseFloat(this.currentOperand);
    let result: number;

    switch (this.operator) {
      case '+':
        result = previousValue + currentValue;
        break;
      case '-':
        result = previousValue - currentValue;
        break;
      case '*':
        result = previousValue * currentValue;
        break;
      case '/':
        result = currentValue === 0 ? NaN : previousValue / currentValue;
        break;
      default:
        return;
    }

    this.currentOperand = isNaN(result) ? 'Error' : result.toString();
    this.clearOperation();
  }

  private handleOperator(op: string): void {
    if (this.currentOperand === '' && this.previousOperand === '') {
      return;
    }

    if (this.previousOperand && this.currentOperand) {
      this.calculate();
    }

    this.operator = op;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }
}
