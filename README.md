# agrimeme-backend

## DOCUMENTATION

TO-DO

### HTTP Request

Selalu subscribe setelah pakai http service
```
this.postService.downvote(postId).subscribe( result => {
      console.log(result);
      this.post.votes = result['votes'];
    },
    err => {
      console.log(err);
    });
```
Kalau gak di subscribe ada kemungkinan ga kekirim request nya.
