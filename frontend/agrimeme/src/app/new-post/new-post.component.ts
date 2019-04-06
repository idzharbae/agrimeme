import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from "@angular/material";
import { Router } from '@angular/router';

import { Post } from '../post';
import { PostService } from '../post.service';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
	post = new Post();
  constructor( private postService: PostService, 
  	private route: ActivatedRoute, public snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  }

  submit(){
  	console.log(this.post);
    this.postService.submitPost(this.post)
      .subscribe( 
      	result => {
          this.snackBar.open('post success!', 'dismiss', {
           duration: 5000,
          });
          this.router.navigate(['home']);
        },
        err => {
          console.log(err);
          this.snackBar.open( JSON.stringify(err['error']['message']+':'+err['error']['message']['detail']), 'dismiss', {
           duration: 5000,
          });
          return false;
        } );
  }
}
