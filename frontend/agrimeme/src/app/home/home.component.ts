import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';

import { Post } from '../post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public posts: Post[];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    this.postService.fetchPosts()
        .subscribe(posts => {
          this.posts = posts.content;
          this.posts.reverse();
        });
  }
  upvote(postId, idx){
    this.postService.upvote(postId).subscribe( result => {
      console.log(result);
      this.posts[idx].votes = result['votes'];
    },
    err => {
      console.log(err);
    });
  }

  downvote(postId, idx){
    this.postService.downvote(postId).subscribe( result => {
      console.log(result);
      this.posts[idx].votes = result['votes'];
    },
    err => {
      console.log(err);
    });
  }

}
