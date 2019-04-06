import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material";

import { UserService } from '../user.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, public snackBar: MatSnackBar) { }

  ngOnInit() {
  	this.userService.isUserLoggedIn.next(false);
  	localStorage.removeItem('accessToken');
  	this.snackBar.open('logout success!', 'dismiss', {
         duration: 5000,
      });
  	this.router.navigate(['home']);
  }

}
