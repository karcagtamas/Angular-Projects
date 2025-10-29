import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
})
export class TodoList {
  protected readonly tasks = signal<string[]>([]);
  protected readonly newTask = signal('');

  protected addTask(): void {
    if (!this.newTask().trim()) {
      this.newTask.set('');
      return;
    }

    this.tasks.update((values) => {
      return [...values, this.newTask()];
    });
    this.newTask.set('');
  }

  protected removeTask(index: number): void {
    this.tasks.update((values) => {
      return values.filter((_, i) => i !== index);
    });
  }
}
