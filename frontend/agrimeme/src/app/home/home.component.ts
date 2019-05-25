import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';
import { VotesService } from '../votes.service';
import { MatSnackBar } from "@angular/material";

import { FeaturedPostsComponent } from '../featured-posts/featured-posts.component';
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
    private postService: PostService, private votesService: VotesService, private snackBar: MatSnackBar
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

  deletePost(postId) {
    this.postService.deletePost(postId).subscribe( result => {
      console.log(result);
      this.getPost();
      this.snackBar.open('Your post successfully deleted!', 'dismiss', {
       duration: 5000,
      });
    },
    err => {
      console.log(err);
      this.snackBar.open( JSON.stringify(err['error']['message']+':'+err['error']['message']['detail']), 'dismiss', {
       duration: 5000,
      });
      return false;
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
