import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public AUTH_API:string = 'http://localhost:8080/api/auth/';

  constructor(
    private http: HttpClient
  ) { }


  // TODO: Implement guard authentication atau authentication service atau ???
  _login(usernameOrEmail: string, password: string): Observable<any>{
    return this.http.post<any>(this.AUTH_API+'signin', { usernameOrEmail, password }, httpOptions);
  }

  _signup(user: User): Observable<any>{
    return this.http.post(this.AUTH_API+'signup', user, httpOptions);
  }

  isLogin(){
    return localStorage.getItem('userToken');
  }
}
