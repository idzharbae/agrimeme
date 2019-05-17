import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostService } from '../post.service';

import { Post } from '../post';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  userId: number;
  posts: Post[];

  constructor(
      private route: ActivatedRoute,
      private postService: PostService
  ) { }

  ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('userId');
    this.fetchUserByPost();
  }

  fetchUserByPost(){
    console.log(this.userId);
    this.postService.fetchUserPosts(this.userId)
      .subscribe( posts => {
        this.posts = posts;
        console.log(this.posts);
      } );
  }

}
