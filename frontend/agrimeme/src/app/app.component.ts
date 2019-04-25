import { Component, OnInit } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

import { UserService } from './user.service';

import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'agrimeme';
  loading = false;
  isLogin : boolean;

  constructor(private router: Router, private userService: UserService){
    if(localStorage.getItem('accessToken') != null){
      this.userService.isUserLoggedIn.next(true);
    }
    this.userService.isUserLoggedIn.subscribe( value => {
            this.isLogin = value;
    });
    this.router.events.subscribe((event: Event) => {
      switch(true){
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }

        default: {
          break;
        }
      }
    });
  }


}
