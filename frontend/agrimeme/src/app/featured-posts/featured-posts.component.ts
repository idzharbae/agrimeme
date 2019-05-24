import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';

import { Post } from '../post';

@Component({
  selector: 'app-featured-posts',
  templateUrl: './featured-posts.component.html',
  styleUrls: ['./featured-posts.component.css']
})
export class FeaturedPostsComponent implements OnInit {

  public trendingposts: Post[];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.getTrendingPosts();
  }

  getTrendingPosts(){
    this.postService.fetchTrendingPosts().subscribe( result => {
      // console.log(result);
      this.trendingposts = result.content;
    },
    err => {
      console.log(err);
    });
  }

}
