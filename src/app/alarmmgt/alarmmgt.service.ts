import { Injectable } from '@angular/core';

//import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Rx';
import {User} from './user';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Image} from '../alarmmgt/image';
import { Intrusion} from './intrusion';
import { Subject } from 'rxjs/Subject';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AlarmmgtService  implements CanActivate {
  session: string;
  redirectUrl: string;
  public sessionObservable: Subject<string>;

  constructor(private http: HttpClient, private router: Router) {
  	this.session='';
    this.sessionObservable = new Subject<string>();
    this.redirectUrl='';
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.session !== "") {
      this.redirectUrl = "";
      return true;
    } else {
      this.redirectUrl = state.url;
      this.router.navigate(['/signin']);
      return false;
    }
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
        this.sessionObservable.next(this.session);
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
        let list=new Array<Intrusion>();
        let tmp=<Array<string>>data;
        tmp=tmp.sort((n1,n2) => {
          if (n1 > n2) {
            return -1;
          }
          if (n1 < n2) {
            return 1;
          }
          return 0;
        });
        for (let entry of tmp) {
          list.push(new Intrusion(entry));
        }
        console.log(JSON.stringify(list));
        resolve(list);
      }, error => {
        reject(error);
      });
    });
    return promise;
  }

  listIntrusionImage(appid: string,intid:string) {
    let promise = new Promise((resolve, reject) => {
      let headers=new HttpHeaders();
      headers=headers.append('Content-Type', 'application/json');
      headers=headers.append('session', this.session);
      this.http.get(environment.baseurl+'/applications/'+appid+"/intrusions/"+intid+"/images", {
        headers: headers
      }).subscribe( data => {
        let list=<Array<Image>>data;
        console.log(JSON.stringify(list));
        for (let image of list) {
          image.url=this.liveIntrusionUrl(appid, intid, image.imageid);
          image.thumbnail=this.liveIntrusionThumbnailUrl(appid, intid, image.imageid);
        }

        resolve(list);
      }, error => {
        reject(error);
      });
    });
    return promise;
  }
  deleteIntrusion(appid: string,intid:string) {
    let promise = new Promise((resolve, reject) => {
      let headers=new HttpHeaders();
      headers=headers.append('Content-Type', 'application/json');
      headers=headers.append('session', this.session);
      this.http.delete(environment.baseurl+'/applications/'+appid+"/intrusions/"+intid, {
        headers: headers
      }).subscribe( data => {
        resolve();
      }, error => {
        reject(error);
      });
    });
    return promise;
  }


  liveAlarmImageUrl(id:string) {
    return(environment.baseurl+'/applications/'+id+"/alarm/liveimage?session="+this.session);
  }
  liveAlarmImageThumbnailUrl(id:string) {
    return(environment.baseurl+'/applications/'+id+"/alarm/liveimage?session="+this.session+"&width=300");
  }
  liveIntrusionThumbnailUrl(appid:string, intid: string, imageid:string) {
    return(environment.baseurl+"/applications/"+appid+"/intrusions/"+intid+"/images/"+imageid+"/thumbnail?session="+this.session+"&width=300");
  }
  liveIntrusionUrl(appid:string, intid: string, imageid:string) {
    return(environment.baseurl+"/applications/"+appid+"/intrusions/"+intid+"/images/"+imageid+"?session="+this.session);
  }

}
