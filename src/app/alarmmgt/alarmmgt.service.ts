import { Injectable } from '@angular/core';

import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {User} from './user';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class AlarmmgtService {
  session: string;

  constructor(private http:Http) {
  	this.session='';
  }


  signin(login: string, password: string) {
  	let promise = new Promise((resolve, reject) => {
	  	let headers = new Headers({ 'Content-Type': 'application/json'});
	    let options = new RequestOptions({ headers: headers });
	    let user = new User(login, password);
	    let body = JSON.stringify(user);
    	this.http.post(environment.baseurl+'/session', body, options).subscribe( data => {
    		this.session=data.json().session;
    		console.log(data);
    		resolve(this.session);
    	}, error => {
    		reject(error);
    	});
    });
    return promise;
  }

}
