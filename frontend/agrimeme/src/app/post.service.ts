import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Post } from './post';

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

  submitPost(post: Post){
    console.log(post);
    let httpHeaders = new HttpHeaders({
     'Content-Type' : 'application/json',
     'Cache-Control': 'no-cache',
     'Authorization' : 'Bearer '+localStorage.getItem('accessToken')
    }); 
    let req = {
      title : post.title, 
      description : post.description,
      content : post.content
    };
    let options = {
      headers: httpHeaders
    }
    console.log('body:');
    console.log(req);
    console.log('opt:');
    console.log(options);
    return this.http.post(this.POSTS_API, req, options);
  }
}
