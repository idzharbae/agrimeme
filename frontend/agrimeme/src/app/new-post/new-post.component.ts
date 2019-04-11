import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  	private route: ActivatedRoute, public snackBar: MatSnackBar, private router: Router, private elem : ElementRef) { }

  ngOnInit() {
  }

  submit(){
    let files = this.elem.nativeElement.querySelector('#image').files;
    let image = new FormData();
    let file = files[0];
    console.log(file);
    image.append('file', file, file.name);

    this.postService.submitImage(image).subscribe(
      resp => {
        console.log(resp);
        console.log(resp['fileDownloadUri']);
        this.post.imageUrl = resp['fileDownloadUri'];
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
        },
        err => {
          console.log(err);
          this.snackBar.open( JSON.stringify(err['error']['message']+':'+err['error']['message']['detail']), 'dismiss', {
           duration: 5000,
          });
          return false;
    });

    
  }
}
