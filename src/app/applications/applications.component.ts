import { Component, OnInit, Input } from '@angular/core';
import { AlarmmgtService} from '../alarmmgt/alarmmgt.service';
import { Router, NavigationEnd } from '@angular/router';



@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  constructor(private alarmmgt: AlarmmgtService, private router:Router) { 
  	console.log("Application constructor");
  	router.events.subscribe(event => {
  		console.log("================== Application Router Event");
    	if(event instanceof NavigationEnd) {
    		console.log("Application Navigation end");
    		if (alarmmgt.session==='') {
    			//we are not login, redirect to signin
    			this.router.navigate(['/signin']);
    		}
    	}
	    // NavigationEnd
	    // NavigationCancel
	    // NavigationError
	    // RoutesRecognized
	  });
  }

  ngOnInit() {
  	console.log("Application ngOnInit");
  }

  
}
