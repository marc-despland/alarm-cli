import { Component,Input } from '@angular/core';
import { AlarmmgtService} from './alarmmgt/alarmmgt.service';
import { GlobalsService} from './globals.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Application} from './alarmmgt/application';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';
	constructor(private router:Router, private api: AlarmmgtService, private globals: GlobalsService) {
		this.api.sessionObservable.subscribe(session => {
			
			this.api.listApplication().then(data => {
				console.log("Loading ListApplication DATA :"+data);
				this.globals.applications=<Array<Application>>data;
				if (this.api.redirectUrl==="") {
					if (this.globals.applications.length>0) {
						this.router.navigate(['/application', this.globals.applications[0].id]);
					}
				} else {
					this.router.navigate([this.api.redirectUrl]);
					this.api.redirectUrl="";
				}
			}, error => {
				console.log("		ListApplication ERROR :"+JSON.stringify(error));

			});
		});
	}


	/*ngOnInit() {
		console.log("ApplicationsComponent Application ngOnInit "+this.id);
		if (this.api.session==='') {
			//we are not login, redirect to signin
			console.log("	Not authenticate, navigate to signin "+this.id);
			this.router.navigate(['/signin']);
		} else {
			console.log("	ListApplication  "+this.id);
			this.api.listApplication().then(data => {
				console.log("		ListApplication DATA :"+data);
				this.data=<Array<Application>>data;
				this.status.applications=<Array<Application>>data;
				if (this.data.length===1) {
					this.status.app=this.data[0];
					this.router.navigate(['/application', this.data[0].id]);
				}
			}, error => {
				console.log("		ListApplication ERROR :"+JSON.stringify(error));

			});
		}
	}*/

}

