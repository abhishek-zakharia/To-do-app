import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpClient = inject(HttpClient);

  constructor() { }

  url: string = 'http://localhost:8000/api/user/';

  createUser(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.url + "create", obj);
  }

  login(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.url + "login", obj);
  }

  getUsers(): Observable<any> {
    return this.httpClient.get<any>(this.url + "view");
  }

  logout(): Observable<any> {
    return this.httpClient.get<any>(this.url + "logout");
  }
}
