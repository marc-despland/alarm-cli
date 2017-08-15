import { Image} from './image';

export class Intrusion {
	_name:string;
	images: Array<Image>;
	
	constructor(name:string) {
		this._name=name;
		this.images=new Array<Image>();
	}

	get id(): string {
		return this._name;
	}

	get name(): string {
		let date=new Date(this._name);
		//console.log("Intrusion name : "+date.toLocaleString('fr-FR'));
		return date.toLocaleString('fr-FR');
	}
}
