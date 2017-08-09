import { Component, OnInit } from '@angular/core';
import { Application} from '../alarmmgt/application';
import { AlarmmgtService} from '../alarmmgt/alarmmgt.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { StatusService} from '../status.service';


@Component({
	selector: 'app-application',
	templateUrl: './application.component.html',
	styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
	id: number;
	app: Application;
	appid: string;
	imgsrc: string;
	countInt: number;

	constructor(private route: ActivatedRoute, private router: Router,private api: AlarmmgtService, private status: StatusService) { 
		this.id=Math.random();
		this.countInt=0;
	}

	initialize(id: string) {
		let promise = new Promise((resolve, reject) => {
			if (this.status.app.id!==id) {
				this.router.navigate(['/applications']);
				reject();
			} else {
				this.appid=id;
				this.api.statusApplication(id).then((app: Application) => {
					console.log("		Application DATA :"+JSON.stringify(app));
					resolve(app);
				}, (error) => reject());
			}
		});
		return promise;
	}
	ngOnInit() {
		console.log("ApplicationComponent Application ngOnInit "+this.id);
		if (this.api.session==='') {
			//we are not login, redirect to signin
			console.log("	Not authenticate, navigate to signin "+this.id);
			this.router.navigate(['/signin']);
		} else {
			console.log("	Application  "+this.id);
			this.route.paramMap.switchMap((params: ParamMap) => this.initialize(params.get('id'))).subscribe((app: Application) => this.app = app);
			this.route.paramMap.switchMap((params: ParamMap) => this.api.countIntrusions(params.get('id'))).subscribe((value: number) => this.countInt = value);
		}
	}

	showIntrusionsHistory() {
		console.log("showIntrusionsHistory "+this.id);
		this.router.navigate(['/application', this.appid, 'intrusions']);
	}
}

