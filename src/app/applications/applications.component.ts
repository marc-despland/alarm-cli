import { Component, OnInit, Input } from '@angular/core';
import { AlarmmgtService} from '../alarmmgt/alarmmgt.service';
import { StatusService} from '../status.service';
import { Application} from '../alarmmgt/application';
import { Router, NavigationEnd } from '@angular/router';
import { NgForOf } from '@angular/common';



@Component({
	selector: 'app-applications',
	templateUrl: './applications.component.html',
	styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
	data: Array<Application>;
	id: number;
	selectedId: string;

	constructor(private router:Router, private api: AlarmmgtService, private status: StatusService) {
		this.data=new Array<Application>();
		this.id=Math.random();
		this.selectedId="";
		console.log("ApplicationsComponent constructor "+this.id);
	}

	ngOnInit() {
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
				if (this.data.length===1) {
					this.status.app=this.data[0];
					this.router.navigate(['/application', this.data[0].id]);
				}
			}, error => {
				console.log("		ListApplication ERROR :"+JSON.stringify(error));

			});
		}
	}


	isSelected(app: Application) { 
		return app.id === this.selectedId; 
	}

  	onSelect(app: Application) {
  		this.status.app=app;
    	this.router.navigate(['/application', app.id]);
  	}



}
