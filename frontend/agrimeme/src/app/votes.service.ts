import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Votes } from './votes';

@Injectable({
  providedIn: 'root'
})
export class VotesService {
	public API:string = 'http://localhost:8080/api';
	constructor(private http: HttpClient) { }
	fetchVotes(userId : number): Observable<any>{
      return this.http.get(this.API+'/user/'+`${userId}`+'/posts/upvoted');
  	}
}
