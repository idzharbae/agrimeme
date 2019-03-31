import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user = new User();

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
  }

  signup () {
    this.userService._signup(this.user)
        .subscribe(result => {
          console.log(result);
          this.router.navigate(['/login']);
        });
  }

}
