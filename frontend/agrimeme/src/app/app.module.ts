import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { JwtInterceptor } from './helpers/jwt-interceptor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';
import { NewPostComponent } from './new-post/new-post.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { FeaturedPostsComponent } from './featured-posts/featured-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    PostComponent,
    LogoutComponent,
    CommentComponent,
    NewPostComponent,
    UserPostsComponent,
    FeaturedPostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    FormsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
