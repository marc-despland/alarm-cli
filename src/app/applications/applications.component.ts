import { Component, OnInit, Input } from '@angular/core';
import { AlarmmgtService} from '../alarmmgt/alarmmgt.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  constructor(private alarmmgt: AlarmmgtService) { }

  ngOnInit() {
  }

  
}
