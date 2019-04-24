import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public POSTS_API:string = 'http://localhost:8080/api/posts/';
  public IMAGE_API:string = 'http://localhost:8080/api/uploadFile/';

  constructor(
    private http: HttpClient
  ) { }

  fetchPosts(): Observable<any>{
      return this.http.get(this.POSTS_API);
  }

  fetchPost(id: number): Observable<any>{
    return this.http.get(this.POSTS_API+`${id}`);
  }

  submitImage(image : FormData){
    console.log(image);
    return this.http.post(this.IMAGE_API, image);
  }

  submitPost(post: Post){
    let httpHeaders = new HttpHeaders({
     'Content-Type' : 'application/json'
    });
    let req = {
      title : post.title,
      description : post.description,
      imageUrl : post.imageUrl
    };
    let options = {
      headers : httpHeaders
    };
    return this.http.post(this.POSTS_API, req, options);
  }
}
