import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { injectQuery, injectQueryClient } from '@tanstack/angular-query-experimental';
import { TodosService } from '../../shared/services/todos/todos.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  standalone: true,
  template: `
    <div>
      @if (query.isPending()) {
        Loading...
      }
      @if (query.error()) {
        An error has occurred: {{ query.error()?.message }}
      }
      @if (query.data(); as datas) {
        <ul>
          @for (todo of datas; track todo.title) {
            <li>{{ todo.title }}</li>
          }
        </ul>
      }
    </div>
  `,
})
export class HomeComponent {
  todoService = inject(TodosService)
  queryClient = injectQueryClient()

  query = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => this.todoService.getTodos(),
  }))

}
