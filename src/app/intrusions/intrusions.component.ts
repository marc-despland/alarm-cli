import { Component, OnInit } from '@angular/core';
import { AlarmmgtService} from '../alarmmgt/alarmmgt.service';
import { StatusService} from '../status.service';
import { Application} from '../alarmmgt/application';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
	selector: 'app-intrusions',
	templateUrl: './intrusions.component.html',
	styleUrls: ['./intrusions.component.css']
})
export class  IntrusionsComponent implements OnInit {
	data: Array<string>;
	id: number;
	selectedId: string;
	appid: string;

	constructor(private route: ActivatedRoute,private router:Router, private api: AlarmmgtService, private status: StatusService) {
		this.data=new Array<string>();
		this.id=Math.random();
		this.selectedId="";
		this.appid="";
		console.log("IntrusionsComponent constructor "+this.id);

	}


	initialize(id: string) {
		let promise = new Promise((resolve, reject) => {
			if (this.status.app.id!==id) {
				this.router.navigate(['/applications']);
				reject();
			} else {
				this.appid=id;
				this.api.listIntrusions(id).then((list: Array<string>) => {
					console.log("		Intrusions DATA :"+JSON.stringify(list));
					resolve(list);
				}, (error) => reject());
			}
		});
		return promise;
	}



	ngOnInit() {
		console.log("IntrusionsComponent ngOnInit "+this.id);
		if (this.api.session==='') {
			//we are not login, redirect to signin
			console.log("	Not authenticate, navigate to signin "+this.id);
			this.router.navigate(['/signin']);
		} else {
			console.log("	ListIntrusions  "+this.id);
			this.route.paramMap.switchMap((params: ParamMap) => this.initialize(params.get('appid'))).subscribe((list: Array<string>) => this.data = list);
		}
	}


	isSelected(intrusion: string) { 
		return intrusion === this.selectedId; 
	}

	onSelect(intrusion: string) {
		this.router.navigate(['/application', this.appid,'intrusion',intrusion]);
	}
	intrusionName(intrusion: string) {
		let date=new Date(intrusion);
		return date.toLocaleString('fr-FR');
	}
}
