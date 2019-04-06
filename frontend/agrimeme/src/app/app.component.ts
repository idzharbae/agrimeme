import { Component } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'agrimeme';
  loading = false;
  isLogin: any;

  constructor(private router: Router, private userService: UserService){
    this.isLogin = this.userService.isLogin();

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

  logout(){
    this.userService._logout();
    this.router.navigate(['/home']);
  }

}
