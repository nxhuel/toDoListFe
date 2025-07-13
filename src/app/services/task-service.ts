import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SaveTask, Task, TaskResponse } from '../interfaces/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private urlTask: string = 'https://wpw5j0f1-7163.brs.devtunnels.ms/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(page: number = 1, pageSize: number = 10): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(
      `${this.urlTask}?page=${page}&pageSize=${pageSize}`
    );
  }

  saveTask(task: SaveTask): Observable<any> {
    return this.http.post(this.urlTask, task);
  }

  editTask(task: SaveTask): Observable<string> {
    return this.http.put(`${this.urlTask}/${task.taskId}`, task, {responseType: 'text'});
  }

  deleteTask(taskId: number): Observable<string> {
    return this.http.delete(`${this.urlTask}/${taskId}`, { responseType: 'text' });
  }
}
