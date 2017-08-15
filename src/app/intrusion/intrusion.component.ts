import { Component, OnInit } from '@angular/core';
import { AlarmmgtService} from '../alarmmgt/alarmmgt.service';
import { GlobalsService} from '../globals.service';
import { Application} from '../alarmmgt/application';
import { Image} from '../alarmmgt/image';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
	selector: 'app-intrusion',
	templateUrl: './intrusion.component.html',
	styleUrls: ['./intrusion.component.css']
})
export class  IntrusionComponent implements OnInit {
	id: number;
	selectedId: string;

	constructor(private route: ActivatedRoute,private router:Router, private api: AlarmmgtService, private globals: GlobalsService) {
		this.id=Math.random();
		this.selectedId="";
		console.log("IntrusionComponent constructor "+this.id);

	}




	ngOnInit() {
		console.log("IntrusionComponent ngOnInit "+this.id);
		console.log("	ListIntrusion  "+this.id);
		this.route.paramMap.switchMap((params: ParamMap) => this.globals.checkIntrusion(params.get('appid'),params.get('intid'))).subscribe(() => {
			console.log("Intrusion Loaded");
		});
	}


	isSelected(image: Image) { 
		return image.imageid === this.selectedId; 
	}

	onSelect(image: Image) {
		this.router.navigate(['/application', this.globals.app.id,'intrusion',this.globals.intrusion.id, 'image', image.imageid]);
	}

	delete() {
		this.api.deleteIntrusion(this.globals.app.id, this.globals.intrusion.id).then( () => {
			this.globals.loadIntrusionsList();
		}, error => {
			console.log("Failed to delete intrusion "+this.globals.intrusion.id+ " "+ JSON.stringify(error));
		});
		this.router.navigate(['/application', this.globals.app.id]);
	}
}
