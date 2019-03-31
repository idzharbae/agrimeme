import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostService } from '../post.service';

import { Post } from '../post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.getPost();
  }

  getPost(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.fetchPost(id)
      .subscribe( post =>  this.post = post );
  }

}
