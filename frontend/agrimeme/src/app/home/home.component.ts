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
        .subscribe(posts => this.posts = posts.content);
  }

}
