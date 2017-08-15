import { Injectable } from '@angular/core';
import { Application, ApplicationStatus} from './alarmmgt/application';
import { Intrusion} from './alarmmgt/intrusion';
import { Image} from './alarmmgt/image';
import { AlarmmgtService} from './alarmmgt/alarmmgt.service';

@Injectable()
export class GlobalsService {
	_app: Application;
	_applications: Array<Application>;
	_intrusions:Array<Intrusion>;
	_intrusion: Intrusion;


  	constructor( private api: AlarmmgtService) {
		this._app=new Application();
		this._applications=new Array<Application>();
		this._intrusions=new Array<Intrusion>();
		this._intrusion=new Intrusion("");
  	}


  	get app() : Application {
  		return this._app;
  	}

  	get applications() : Array<Application> {
  		return this._applications;
  	}
  	get intrusions() : Array<Intrusion> {
  		return this._intrusions
  	}

  	set app(app:Application) {
  		this.loadApplication(app);
  	}

  	set appstatus(status:ApplicationStatus) {
  		this._app.status=status;
  	}

  	set applications(applications: Array<Application>)  {
  		this._applications=applications;
  	}

  	set intrusions(intrusions: Array<Intrusion>) {
  		this._intrusions=intrusions;
  	}

  	get intrusion():Intrusion {
  		return this._intrusion;
  	}

  	loadIntrusionsList() {
  		return new Promise((resolve, reject) => {
  			this._intrusions=new Array<Intrusion>();
  			this.api.listIntrusions(this._app.id).then((list: Array<Intrusion>) => {
  				this._intrusions = list;
  				this._app.countInt=list.length;
  				if (this._app.countInt>0) {
  					this._intrusion=this._intrusions[0];
  				} else {
  					this._intrusion=new Intrusion("");
  				}
  				console.log("== loadIntrusionsList");
  				resolve();
  			},(error) => {
  				console.log("Failed to load application status :"+JSON.stringify(error));
  				reject(error);
  			}); 
  		}); 		
  	}

  	loadApplication(app:Application) {
  		return new Promise((resolve, reject) => {
  			this._app=app;
  			this.api.statusApplication(this._app.id).then((appstatus: ApplicationStatus) => {
  				console.log("== loadApplication status :"+JSON.stringify(appstatus));
  				this.app.status=appstatus;
  				this.loadIntrusionsList().then(() => resolve(), error => reject(error));
  			}, (error) => {
  				console.log("Failed to load application status :"+JSON.stringify(error));
  				reject(error);
  			});		
  		});
  	}


  	loadIntrusion(intrusion:Intrusion) {
  		return new Promise((resolve, reject) => {
  			this._intrusion=intrusion;
  			this.api.listIntrusionImage(this._app.id, this._intrusion.id).then((images: Array<Image>) => {
  				console.log("== loadIntrusion list images loaded :"+JSON.stringify(images));
  				this._intrusion.images=images;
  				resolve();
  			}, (error) => {
  				console.log("Failed to load application status :"+JSON.stringify(error));
  				reject(error);
  			});		
  		});
  	}


  	checkApp(appid:string) {
  		return new Promise((resolve, reject) => {
        if (appid===undefined) {
          reject("Unknown application");
        } else {
          if (appid===this._app.id) {
            resolve();
          } else {
            let tmp:Array<Application> = this._applications.filter(app => app.id===appid);
            if (tmp.length===1) {
              this.loadApplication(tmp[0]).then( () => {
                resolve();
              }, (error) => {
                console.log("Failed to load application :"+JSON.stringify(error));
                reject(error);
              })
            } else {
              console.log("Can't find appid : "+appid);
              reject("Can't find appid : "+appid);
            }
          }
        }
      });
  	}


  	checkIntrusion(appid:string, intid:string) {
  		return new Promise((resolve, reject) => {
  			this.checkApp(appid).then(() => {
  				let tmp:Array<Intrusion> = this._intrusions.filter(intrusion => intrusion.id===intid);
  				if (tmp.length===1) {
  					this.loadIntrusion(tmp[0]).then( () => {
  						resolve();
  					}, (error) => {
  						reject(error);
  					});
  				} else {
  					reject("Can't find intid : "+intid);
  				}
  			}, error => {
  				reject(error);
  			});
  		});
  	}


    checkIntrusionImage(appid:string, intid:string, imageid:string) {
      return new Promise((resolve, reject) => {
        if (imageid === undefined) {
          reject("Invalid imageid");
        } else {
          this.checkIntrusion(appid, intid).then(() => {
            let tmp:Array<Image> = this._intrusion.images.filter(image => image.imageid===imageid);
            if (tmp.length===1) {
                resolve(tmp[0]);
            } else {
              reject("Can't find intid : "+intid);
            }
          }, error => {
            reject(error);
          });
        }
      });
    }

    checkLiveImage(appid:string) {
      return new Promise((resolve, reject) => {
        this.checkApp(appid).then(() => {
          let image: Image=new Image();
          image.imageid="live";
          image.url=this.api.liveAlarmImageUrl(appid);
          image.thumbnail=this.api.liveAlarmImageThumbnailUrl(appid);
          resolve(image);
        }, error => {
          reject(error);
        });
      });
    }


}
