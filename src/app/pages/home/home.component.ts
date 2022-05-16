import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginSub!:Subscription;

  validUsername:boolean = false;
  loginAttempt:boolean = false;
  loginFail!:boolean;
  newUsername:boolean = false;

  constructor(private fb: FormBuilder, private dataService:DataService) { }

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
    console.log("login attempted...")
    this.dataService.login(this.loginInfo.get('username')?.value,this.loginInfo.get('password')?.value).subscribe(r => { 
      this.validUsername = r;
      console.log("Received the json...")
      if(r == true)
        this.loginFail = false;
      else
        this.loginFail = true;
    });
    
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

  set username(inp:string){
    this.loginInfo.setValue({username:inp})
  }
  set password(inp:string){
    this.loginInfo.setValue({password:inp})
  }
}
