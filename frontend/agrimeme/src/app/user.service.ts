import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public AUTH_API:string = 'http://localhost:8080/api/auth/';

  constructor(
    private http: HttpClient
  ) { }

  _login(usernameoremail: string, password: string): Observable<any>{
    let user = {
      'usernameOrEmail': usernameoremail,
      'password': password
    }
    return this.http.post(this.AUTH_API+'signin', user, httpOptions);
  }

  _signup(name: string, email: string, username: string, password: string): Observable<any>{
    let user = {
      'name': name,
      'email': email,
      'username': username,
      'password': password
    }
    return this.http.post(this.AUTH_API+'signup', user, httpOptions);
  }

}
