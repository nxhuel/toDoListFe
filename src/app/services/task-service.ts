import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, TaskResponse } from '../interfaces/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private urlTask: string = "https://2srnts1c-7163.brs.devtunnels.ms/api/tasks";

  constructor(
    private http: HttpClient
  ) { }

  getTasks(page: number = 1, pageSize: number = 10): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(`${this.urlTask}?page=${page}&pageSize=${pageSize}`);
  }
}
