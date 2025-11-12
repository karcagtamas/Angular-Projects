import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TodoDTO } from '../models/todo.model';
import { catchError, map, Observable } from 'rxjs';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);

  private todos: TodoDTO[] = [];

  getTodos(): TodoDTO[] {
    return this.todos;
  }

  fetchTodos(userId: number): Observable<TodoDTO[]> {
    return this.http.get<TodoDTO[]>(`${API_URL}?userId=${userId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error has occured: ', error);
        throw new Error('Something went wrong during user fetch');
      }),
      map((todos) => {
        this.todos = todos;
        return todos;
      })
    );
  }

  addTodo(newTodo: Partial<TodoDTO>): void {
    const todoId = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;
    const todoInstance = {
      userId: newTodo.userId!,
      id: todoId,
      title: newTodo.title || 'New Todo',
      completed: false,
    } as TodoDTO;
    this.todos.push(todoInstance);
    console.log(`Todo added: `, todoInstance);
  }

  deleteTodo(todoId: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
    console.log(`Todo with id ${todoId} deleted.`);
  }

  editTodoById(todoId: number, updatedTodo: Partial<TodoDTO>): TodoDTO {
    const todo = this.todos.find((todo) => todo.id === todoId);

    if (!todo) {
      throw new Error('Todo not found');
    }

    Object.assign(todo, updatedTodo);
    console.log(`Todo with id ${todoId} updated: `, todo);
    return todo;
  }
}
