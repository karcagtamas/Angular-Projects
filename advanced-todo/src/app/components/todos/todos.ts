import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserDTO } from '../../models/user.model';
import { TodoDTO } from '../../models/todo.model';
import { UserService } from '../../services/user.service';
import { TodoService } from '../../services/todo.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-todos',
  imports: [CommonModule, FormsModule],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
})
export class Todos implements OnInit {
  private readonly userService = inject(UserService);
  private readonly todoService = inject(TodoService);

  protected readonly users = signal<UserDTO[]>([]);
  protected readonly todos = signal<TodoDTO[]>([]);
  protected readonly selectedUser = signal<UserDTO | undefined>(undefined);
  protected readonly selectedUserId = signal<number | string>('');
  protected readonly newTodoTitle = signal('');
  protected readonly currentEditingTodoId = signal<number | null>(null);
  protected readonly currentEditingTodoTitle = signal('');

  ngOnInit(): void {
    firstValueFrom(this.userService.fetchUsers())
      .then((res) => {
        this.users.set(res);
      })
      .catch((err) => {
        console.error('Failed to fetch users: ', err);
        this.users.set([]);
      });
  }

  protected fetchTodos(userId: number): void {
    console.log('Fetching todos for user: ', userId);
    firstValueFrom(this.todoService.fetchTodos(userId))
      .then((res) => {
        this.todos.set(res);
        console.log('Fetched todos: ', res);
      })
      .catch((err) => {
        console.error('Failed to fetch todos: ', err);
      });
  }

  protected onUserSelect(): void {
    if (!this.selectedUserId()) {
      return;
    }

    firstValueFrom(this.userService.findUserById(+this.selectedUserId()))
      .then((res) => {
        if (!res) {
          console.error('Selected user not found');
          return;
        }
        this.selectedUser.set(res);
        this.fetchTodos(res.id);
      })
      .catch((err) => console.error('Error fetching user: ', err));
  }

  protected addTodo(): void {
    if (!this.newTodoTitle().trim() || !this.selectedUser()) {
      alert('Please select a user and enter a todo title');
      return;
    }

    const newTodo = {
      userId: this.selectedUser()?.id,
      title: this.newTodoTitle(),
      completed: false,
    } as TodoDTO;

    this.todoService.addTodo(newTodo);
    this.todos.set(this.todoService.getTodos());
    this.newTodoTitle.set('');
  }

  protected deleteTodo(todoId: number): void {
    this.todoService.deleteTodo(todoId);
    this.todos.set(this.todoService.getTodos());
  }

  protected openEditModal(todo: TodoDTO): void {
    this.currentEditingTodoId.set(todo.id);
    this.currentEditingTodoTitle.set(todo.title);
  }

  protected saveChanges(updatedTitle: string): void {
    if (this.currentEditingTodoId() && updatedTitle.trim()) {
      this.todoService.editTodoById(this.currentEditingTodoId()!, { title: updatedTitle });

      this.todos.set(this.todoService.getTodos());
      this.currentEditingTodoId.set(null);
      this.currentEditingTodoTitle.set('');
    }
  }
}
