import { Component, OnInit, Input } from '@angular/core';

import { CommentService } from '../comment.service';

import { Comment } from '../comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() id: number;
  public comments: Comment[];
  comment= new Comment();

  constructor(
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.fetchComment();
  }

  fetchComment(){
    this.commentService.fetchComment(this.id)
      .subscribe( comments => this.comments = comments.content );
  }

  submitComment(){
    console.log(this.comment);
    this.commentService.submitPost(this.id, this.comment)
      .subscribe(
        result => {
          console.log(result);
        });
  }

}
