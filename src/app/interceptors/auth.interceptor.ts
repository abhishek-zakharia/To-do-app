import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export class AuthInterCeptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authservice = inject(AuthService);
    if (authservice.checkLogin()) {
      let token = JSON.parse(sessionStorage.getItem('loginUser'))["token"];  
      const modifyReq = httpRequest.clone({ headers: httpRequest.headers.set('Authorization', 'Bearer ' + token) });
      return next.handle(modifyReq);
    }
    return next.handle(httpRequest);
  }
}