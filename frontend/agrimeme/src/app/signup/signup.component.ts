import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email: string;
  username: string;
  name: string;
  password: string;

  constructor(private userService: UserService) {}

  ngOnInit() {
  }

  signup () {
    // console.log("The data are: ",this.email, this.username, this.name, this.password);
    this.userService._signup(this.name, this.email, this.username, this.password)
        .subscribe(result => {
          console.log(result);
        });
  }

}
