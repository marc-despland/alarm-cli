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

  listApplication() {
  	let promise = new Promise((resolve, reject) => {
      let headers=new HttpHeaders();
      headers=headers.append('Content-Type', 'application/json');
      headers=headers.append('session', this.session);
    	this.http.get(environment.baseurl+'/applications', {
    		headers: headers
  		}).subscribe( data => {
    		console.log(JSON.stringify(data));
    		resolve(data);
    	}, error => {
    		reject(error);
    	});
    });
    return promise;
  }


  statusApplication(id: string) {
    let promise = new Promise((resolve, reject) => {
      let headers=new HttpHeaders();
      headers=headers.append('Content-Type', 'application/json');
      headers=headers.append('session', this.session);
      this.http.get(environment.baseurl+'/applications/'+id+"/alarm/status", {
        headers: headers
      }).subscribe( data => {
        console.log(JSON.stringify(data));
        resolve(data);
      }, error => {
        reject(error);
      });
    });
    return promise;
  }

  countIntrusions(appid: string) {
    let promise = new Promise((resolve, reject) => {
      let headers=new HttpHeaders();
      headers=headers.append('Content-Type', 'application/json');
      headers=headers.append('session', this.session);
      this.http.get(environment.baseurl+'/applications/'+appid+"/intrusions", {
        headers: headers
      }).subscribe( data => {
        let list=<Array<string>>data;
        console.log(JSON.stringify(list));
        resolve(list.length);
      }, error => {
        reject(error);
      });
    });
    return promise;
  }

  listIntrusions(appid: string) {
    let promise = new Promise((resolve, reject) => {
      let headers=new HttpHeaders();
      headers=headers.append('Content-Type', 'application/json');
      headers=headers.append('session', this.session);
      this.http.get(environment.baseurl+'/applications/'+appid+"/intrusions", {
        headers: headers
      }).subscribe( data => {
        let list=<Array<string>>data;
        console.log(JSON.stringify(list));
        resolve(list);
      }, error => {
        reject(error);
      });
    });
    return promise;
  }

  liveAlarmImageUrl(id:string) {
    return(environment.baseurl+'/applications/'+id+"/alarm/liveimage?session="+this.session+"&width=300");
  }
}
