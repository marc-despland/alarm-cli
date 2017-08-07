import { Injectable } from '@angular/core';

//import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Rx';
import {User} from './user';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class AlarmmgtService {
  session: string;

  constructor(private http: HttpClient) {
  	this.session='';
  }


  signin(login: string, password: string) {
  	let promise = new Promise((resolve, reject) => {
	    let user = new User(login, password);
	    let body = JSON.stringify(user);
    	this.http.post(environment.baseurl+'/session', body, {
    		headers: new HttpHeaders().set('Content-Type', 'application/json'),
  		}).subscribe( data => {
    		this.session=data['session'];
    		console.log(JSON.stringify(data));
    		resolve(this.session);
    	}, error => {
    		reject(error);
    	});
    });
    return promise;
  }

  listapplication() {
  	let promise = new Promise((resolve, reject) => {
    	this.http.get(environment.baseurl+'/application', {
    		headers: new HttpHeaders().set('Content-Type', 'application/json').set('session', this.session),
  		}).subscribe( data => {
    		console.log(JSON.stringify(data));
    		resolve(this.session);
    	}, error => {
    		reject(error);
    	});
    });
    return promise;
  }


}
