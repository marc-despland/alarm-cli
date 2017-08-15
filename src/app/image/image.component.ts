import { Component, OnInit } from '@angular/core';
import { AlarmmgtService} from '../alarmmgt/alarmmgt.service';
import { Image} from '../alarmmgt/image';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GlobalsService} from '../globals.service';

@Component({
	selector: 'app-image',
	templateUrl: './image.component.html',
	styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
	image:Image;
	fullsize:boolean;
	id:number;

	constructor(private route: ActivatedRoute,private router:Router, private api: AlarmmgtService, private globals: GlobalsService) {
		this.image=new Image();
		this.fullsize=false;
		this.id=Math.random();
	}

	initialize(params:ParamMap) {
		return new Promise((resolve, reject) => {
			if (params.has("intid")) {
				this.globals.checkIntrusionImage(params.get('appid'),params.get('intid'), params.get('imageid')).then((image) => resolve(image), (error) => reject(error));
			} else {
				this.globals.checkLiveImage(params.get('appid')).then((image) => resolve(image), (error) => reject(error));
			}
		});
	}

	ngOnInit() {
		console.log("ImageComponent ngOnInit "+this.id);
		this.route.paramMap.switchMap((params: ParamMap) => this.initialize(params)).subscribe((image) => {
			console.log("Image Loaded");
			this.image=<Image>image;
		});
	}

	switchSize() {
		this.fullsize= !this.fullsize;
	}

}
