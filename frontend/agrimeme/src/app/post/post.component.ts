import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostService } from '../post.service';

import { Post } from '../post';
import { CommentComponent } from '../comment/comment.component';
import { FeaturedPostsComponent } from '../featured-posts/featured-posts.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post = new Post();
  id: number;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {
    this.getPost();
  }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.id = +this.route.snapshot.paramMap.get('id');
  		this.getPost();
  	});
  }

  getPost(){
    this.postService.fetchPost(this.id)
      .subscribe( post =>  this.post = post );
  }

  upvote(postId, idx){
    this.postService.upvote(postId).subscribe( result => {
      console.log(result);
      this.post.votes = result['votes'];
    },
    err => {
      console.log(err);
    });
  }

  downvote(postId, idx){
    this.postService.downvote(postId).subscribe( result => {
      console.log(result);
      this.post.votes = result['votes'];
    },
    err => {
      console.log(err);
    });
  }
}
