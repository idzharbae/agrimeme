import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { MatSnackBar } from "@angular/material";

import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailorusername: string;
  password: string;

  constructor(private userService: UserService, private router: Router
    , private app: AppComponent, public snackBar: MatSnackBar) {}

  ngOnInit() {
    if(this.app.isLogin === true)
      this.router.navigate(['home']);
  }

  login(){
    // console.log("the data are: ",this.password, this.emailorusername);
    this.userService._login(this.emailorusername, this.password)
      .subscribe(
        result => {
          console.log(result['accessToken']);
          localStorage.setItem('accessToken', result['accessToken']);
          this.userService.isUserLoggedIn.next(true);
          this.snackBar.open('login success!', 'dismiss', {
           duration: 5000,
          });
          this.router.navigate(['home']);
        },
        err => {
          console.log(err);
          this.snackBar.open( err['error']['message'], 'dismiss', {
           duration: 5000,
          });
          return false;
        }
      );

  }

}
