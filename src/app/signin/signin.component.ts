import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlarmmgtService } from '../alarmmgt/alarmmgt.service';
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
	error: boolean=false;
	public signinForm = this.fb.group({
		login: ["", Validators.required],
		password: ["", Validators.required]
  	});

  constructor(public fb: FormBuilder, private api: AlarmmgtService) { }

  ngOnInit() {
  }


  signin(event) {
  	event.preventDefault();
  	this.api.signin(this.signinForm.value.login, this.signinForm.value.password).then( session => {
      console.log("Session : "+ session);
      this.error=false;
      this.signinForm.controls['password'].setValue("");
      return true;
    }, error => {
      this.error=true;
      this.signinForm.controls['password'].setValue("");
      return false;
    });
  }

}
