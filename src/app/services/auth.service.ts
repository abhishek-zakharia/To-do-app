import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);

  constructor() { }

  public isLoggedIn = false;
  private router = inject(Router);

  url: string = 'http://localhost:8000/api/user/';

  setLogin(userData) {
    if (userData == null) {
      this.isLoggedIn = false;
      return this.isLoggedIn;
    } else {
      sessionStorage.setItem('loginUser', JSON.stringify({ 'token': userData.token, 'role_id': userData.user['role_id'] }));
      this.isLoggedIn = true;
      return this.isLoggedIn;
    }
  }

  checkLogin() {
    if (sessionStorage.getItem('loginUser')) {
      return true;
    }
    return this.isLoggedIn;
  }

  logOut() {
    if (typeof sessionStorage != 'undefined') {
      sessionStorage.removeItem('loginUser');
      this.isLoggedIn = false;
      this.router.navigate(["login"]);
    }
  }

  isAdmin() {
    if (sessionStorage.getItem('loginUser') != null) {
      if (JSON.parse(sessionStorage.getItem('loginUser'))["role_id"] == 2) {
        return true;
      }
    }
    return false;
  }
} 
