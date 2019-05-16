import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';
import { VotesService } from '../votes.service';

import { Post } from '../post';
import { Votes } from '../votes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public posts: Post[];
  public votes: Votes[]; 
  public userId : number;
  constructor(
    private postService: PostService, private votesService: VotesService
  ) { }

  ngOnInit() {
    this.userId = +localStorage.getItem('userId');
    this.getPost();
  }

  getPost() {
    this.postService.fetchPosts()
        .subscribe(posts => {
          this.posts = posts.content;
          this.posts.reverse();
          this.votesService.fetchVotes(this.userId)
            .subscribe(votes => {
              this.votes = votes;
              for(var i = 0; i < this.posts.length; i++){
                this.posts[i].vote = 0;
                for(var j = 0; j < this.votes.length; j++){
                  if(this.votes[j].voteIdentity.postId == this.posts[i].id ){
                    this.posts[i].vote = this.votes[j].value;
                    break;
                  }
                }
              }
            });
        });
  }

  upvote(postId, idx){
    this.postService.upvote(postId).subscribe( result => {
      console.log(result);
      this.posts[idx].votes = result['votes'];
      this.posts[idx].vote = 1;
    },
    err => {
      console.log(err);
    });
  }

  downvote(postId, idx){
    this.postService.downvote(postId).subscribe( result => {
      console.log(result);
      this.posts[idx].votes = result['votes'];
      this.posts[idx].vote = -1;
    },
    err => {
      console.log(err);
    });
  }

}
