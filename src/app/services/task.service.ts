import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  httpClient = inject(HttpClient);

  constructor() {

  }
  url: string = 'http://localhost:8000/api/task/';

  getTasks(): Observable<any> {
    return this.httpClient.get<any>(this.url + "view");
  }

  getUsersTasks(obj: any): Observable<any> {
    return this.httpClient.get<any>(this.url + "usersTask/" + obj);
  }

  addTask(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.url + "create", obj.value);
  }

  deleteTask(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.url + "delete/" + id);
  }

  editTask(id: any): Observable<any> {
    return this.httpClient.get<any>(this.url + "edit/" + id);
  }

  updateTask(obj: any): Observable<any> {
    return this.httpClient.put<any>(this.url + 'update', obj.value);
  }
}
