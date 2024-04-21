import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

interface Todo {
  id: string
  title: string
}

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  http = inject(HttpClient)

  getTodos(): Promise<Todo[]> {
    return lastValueFrom(
      this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos'),
    )
  }
}
