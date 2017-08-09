import { Sensor} from './sensor';

export class Application {
	id: string;
	name:string;
	program: string;
	version: string;
	description: string;
	intrusion: boolean;
	pause:boolean;
	sensors: Array<Sensor>;
	
	constructor() {
		this.id="";
		this.name="";
		this.program="";
		this.version="";
		this.description="";
		this.intrusion=false;
		this.pause=false;
		this.sensors= new Array<Sensor>();
	}
}
