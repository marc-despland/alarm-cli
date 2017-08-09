import { Injectable } from '@angular/core';
import { Application} from './alarmmgt/application';

@Injectable()
export class StatusService {
	app: Application;
  	constructor() {
		this.app=new Application();
  	}

}
