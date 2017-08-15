import { Component, OnInit } from '@angular/core';
import { Application} from '../alarmmgt/application';
import { AlarmmgtService} from '../alarmmgt/alarmmgt.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GlobalsService} from '../globals.service';


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

	constructor(private route: ActivatedRoute, private router: Router,private api: AlarmmgtService, private globals: GlobalsService) { 
		this.id=Math.random();
		this.countInt=0;
	}

	ngOnInit() {
		console.log("ApplicationComponent Application ngOnInit "+this.id);
		console.log("	Application  "+this.id);
		this.route.paramMap.switchMap((params: ParamMap) => this.globals.checkApp(params.get('appid'))).subscribe(() => {
			console.log("Application loaded");
		});
	}

	showIntrusionsHistory() {
		console.log("showIntrusionsHistory "+this.id);
		this.router.navigate(['/application', this.appid, 'intrusions']);
	}
}

