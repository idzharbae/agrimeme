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

  constructor(
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.getComment();
  }

  getComment(){
    this.commentService.fetchComment(this.id)
      .subscribe( comments => this.comments = comments.content );
  }

}
