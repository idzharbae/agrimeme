import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public POSTS_API:string = 'http://localhost:8080/api/posts/';

  constructor(
    private http: HttpClient
  ) { }

  fetchPosts(): Observable<any>{
      return this.http.get(this.POSTS_API);
  }

  fetchPost(id: number): Observable<any>{
    return this.http.get(this.POSTS_API+`${id}`);
  }

}
