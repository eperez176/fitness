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
  loginFail:boolean = false;
  newUsername:boolean = false;

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
    this.loginFail = true;
    console.log("login attempt")
  }

  goBack(){
    this.loginAttempt = !this.loginAttempt;
    this.loginFail = false;
  }
  newUser(){
    this.loginAttempt = !this.loginAttempt;
    this.newUsername = true;
    console.log("new user")
  }
  goBack2(){
    this.loginAttempt = false;
    this.newUsername = false;
    console.log("Go Back")
  }
  submitUser(){
    this.loginAttempt = false;
    this.newUsername = false;
    console.log("Submit")
  }

  get username():any{
    return this.loginInfo.get("username")
  }
  get password():any{
    return this.loginInfo.get("password")
  }
}
