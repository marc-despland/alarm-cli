import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { SigninService } from './signin.service';
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'signin',
  providers: [SigninService],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
	@Input() session :string = "";
	@Output() sessionChange : EventEmitter<string> = new EventEmitter<string>();
	error: boolean=false;
	public signinForm = this.fb.group({
		login: ["", Validators.required],
		password: ["", Validators.required]
  	});

  constructor(public fb: FormBuilder, private api: SigninService) { }

  ngOnInit() {
  }


  signin(event) {
  	event.preventDefault();
	this.api.signin(this.signinForm.value.login, this.signinForm.value.password).subscribe(data => {
  		console.log("Received : "+ data);
  		console.log("Session : "+ data.session);
  		this.error=false;
  		this.signinForm.controls['password'].setValue("");
  		this.session=data.session;
  		this.sessionChange.emit(this.session);
  		return true;
  	}, error => {
  		this.error=true;
      this.signinForm.controls['password'].setValue("");
  		this.session="";
  		this.sessionChange.emit(this.session);
        return false;
    });
  	
  }
}
