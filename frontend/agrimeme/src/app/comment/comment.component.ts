import { Component, OnInit, Input } from '@angular/core';

import { UserService } from '../user.service';
import { CommentService } from '../comment.service';

import { Comment } from '../comment';
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() id: number;
  public comments: Comment[];
  comment = new Comment();

  isLogin : boolean;
  userId : number;

  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.userService.isUserLoggedIn.subscribe( value => {
            this.isLogin = value;
            this.userId = Number(localStorage.getItem('userId'));
    });
  }

  ngOnInit() {
    this.fetchComment();
  }

  fetchComment(){
    this.commentService.fetchComment(this.id)
      .subscribe( comments => {
        this.comments = comments.content;
    },
    err => {
      console.log(err);
    });
  }

  submitComment(){
    console.log(this.comment);
    this.commentService.submitPost(this.id, this.comment)
      .subscribe(
        result => {
          this.snackBar.open('Comment success!', 'dismiss', {
           duration: 5000,
          });
          this.comments.push(result);
        },
        err => {
          console.log(err);
          this.snackBar.open( JSON.stringify(err['error']['message']+':'+err['error']['message']['detail']), 'dismiss', {
           duration: 5000,
          });
          return false;
        }
      );
  }

  deleteComment(index: number){
    this.commentService.deleteComment(this.comments[index]).subscribe( result => {
      this.snackBar.open('Comment deleted successfully!', 'dismiss', {
       duration: 5000,
      });
      this.fetchComment();
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
