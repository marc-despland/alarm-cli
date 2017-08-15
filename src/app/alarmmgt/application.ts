import { Sensor} from './sensor';

export class Application {
	id: string;
	name:string;
	countInt: number;
	status: ApplicationStatus;
	intrusions: Array<string>;
	
	constructor() {
		this.id="";
		this.name="";
		this.countInt=0;
		this.status=new ApplicationStatus();
		this.intrusions=new Array<string>();
	}
}


export class ApplicationStatus {
	program: string;
	version: string;
	description: string;
	intrusion: boolean;
	pause:boolean;
	sensors: Array<Sensor>;
	
	constructor() {
		this.program="";
		this.version="";
		this.description="";
		this.intrusion=false;
		this.pause=false;
		this.sensors= new Array<Sensor>();
	}
}
