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
    let httpHeaders = new HttpHeaders({
     'Cache-Control': 'no-cache',
     'Authorization' : 'Bearer '+localStorage.getItem('accessToken')
    });
    let options = {
      headers : httpHeaders
    };
    console.log(image);
    return this.http.post(this.IMAGE_API, image, options);
  }

  submitPost(post: Post){
    let httpHeaders = new HttpHeaders({
     'Content-Type' : 'application/json',
     'Cache-Control': 'no-cache',
     'Authorization' : 'Bearer '+localStorage.getItem('accessToken')
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
