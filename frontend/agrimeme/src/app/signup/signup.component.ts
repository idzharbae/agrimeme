import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material";

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user = new User();

  constructor(private userService: UserService, private router: Router, public snackBar: MatSnackBar) {}

  ngOnInit() {
  }

  signup () {
    this.userService._signup(this.user)
        .subscribe(result => {
          console.log(result);
          this.snackBar.open('signup success!', 'dismiss', {
           duration: 5000,
          });
          this.router.navigate(['/login']);
        },
        err =>{
          console.log(err);
          this.snackBar.open( err['error']['message']+': '+err['error']['detail'], 'dismiss', {
           duration: 5000,
          });
          return false;
        });
  }

}
