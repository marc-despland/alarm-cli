import { Injectable } from '@angular/core';

@Injectable()
export class AlarmmgtService {
  session: string;

  constructor() {
  	this.session='';
  }

}
