import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailorusername: string;
  password: string;

  constructor(private userService: UserService) {}

  ngOnInit() {
  }

  login(){
    // console.log("the data are: ",this.password, this.emailorusername);
    this.userService._login(this.emailorusername, this.password)
      .subscribe(
        result => {
          console.log(result);
          localStorage.setItem('userToken', JSON.stringify(result));
          return true;
        },
        err => {
          return false;
        }
      );

  }
}
