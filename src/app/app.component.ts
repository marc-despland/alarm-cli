import { Component,Input } from '@angular/core';
import { AlarmmgtService} from './alarmmgt/alarmmgt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private alarmmgt: AlarmmgtService) {
	}

}

