# agrimeme-backend

## DOCUMENTATION

TO-DO

### HTTP Request

`this.postService.downvote(postId).subscribe( result => {
      console.log(result);
      this.posts[idx].votes = result['votes'];
    },
    err => {
      console.log(err);
    });`
Kalau gak di subscribe ada kemungkinan ga kekirim request nya.
