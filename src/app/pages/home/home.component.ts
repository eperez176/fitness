import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  validUsername:boolean = false;
  loginAttempt:boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  loginInfo = this.fb.group({
    username:['',{validators:[
      Validators.required
    ]}],
    password:['',{validators:[
      Validators.required
    ]}]

  })

  onSubmit(){
    this.loginAttempt = !this.loginAttempt;
    console.log("login attempt")
  }

  goBack(){
    this.loginAttempt = !this.loginAttempt;
  }
  newUser(){
    console.log("new user")
  }

  get username():any{
    return this.loginInfo.get("username")
  }
  get password():any{
    return this.loginInfo.get("password")
  }
}
