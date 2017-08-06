import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {User} from './user';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class SigninService {

  constructor(private http:Http) { }

  signin(login: string, password: string) {
  	let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let user = new User(login, password);
    let body = JSON.stringify(user);
    return this.http.post(environment.baseurl+'/session', body, options).map((res:Response) => res.json());
  }

}
