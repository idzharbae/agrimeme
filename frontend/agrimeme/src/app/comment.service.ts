import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PostService } from './post.service';

import { Comment } from './comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(
    private postService: PostService,
    private http: HttpClient
  ) { }

  fetchComment(id: number): Observable<any>{
    return this.http.get<any>(this.postService.POSTS_API+`${id}`+'/comments');
  }

  submitPost(postId: number, comment: Comment): Observable<any>{
    return this.http.post<any>(this.postService.POSTS_API+`${postId}`+'/comments', comment);
  }

  deleteComment(comment: Comment): Observable<any>{
    return this.http.delete<any>(this.postService.POSTS_API+`${comment.postId}`+'/comments/'+`${comment.id}`);
  }
}
