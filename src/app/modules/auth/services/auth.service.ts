import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = enviroment.api;

  constructor(private http: HttpClient, private cookie: CookieService) { }

  sendCredentials(email: string, password: string): Observable<any> {
    console.log("....", email, password);
    const body = { email, password }
    return this.http.post(`${this.URL}/auth/login`, body).pipe(
      tap( (responseOk: any) => {
        console.log("Sesion iniciada correcta")
        this.cookie.set('token2', responseOk.tokenSession, 4, '/')
      })
    )
  }
}
