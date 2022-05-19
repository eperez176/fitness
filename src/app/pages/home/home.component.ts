import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginSub!:Subscription;
  userSub!:Subscription;

  validUsername:boolean = false;
  loginAttempt:boolean = false;
  loginFail!:boolean;
  newUsername:boolean = false;

  currentUsername!:string;

  constructor(private fb: FormBuilder, private dataService:DataService, private router:Router, private uiService: UiService) { }

  ngOnInit(): void {
    this.loginSub = this.uiService.getUsernameStatus().subscribe(r => {
      this.validUsername = r;
      console.log("loginSub changed..")
    });
    this.userSub = this.uiService.getUsername().subscribe(r =>{
      this.currentUsername = r;
    })
  }

  loginInfo = this.fb.group({
    username:['',{validators:[
      Validators.required
    ]}],
    password:['',{validators:[
      Validators.required
    ]}]

  });

  signUpInfo = this.fb.group({
    newName:['',{validators:[
      Validators.required
    ]}],
    newPass:['',{validators:[
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
      {
        this.uiService.setUsername(this.loginInfo.get('username')?.value)
        this.uiService.setUsernameStatus(true);
        this.loginFail = false;
      }
        
      else
      {
        this.loginFail = true;
      }
        
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
    this.dataService.newUser(this.signUpInfo.get('newName')?.value,this.signUpInfo.get('newPass')?.value).subscribe(r => {
      if(r)
      {
        console.log("new user made!");
      }
      else
        console.log("username already exists")
    });
    console.log("Submit")
  }
  goSubmission(){
      this.router.navigate(['/sub'])
  }
  signOut(){
    this.uiService.setUsernameStatus(false);
    this.loginAttempt = false;
    console.log("signinig out");
    this.currentUsername = '';
  }

  get username():any{
    return this.loginInfo.get("username")
  }
  get password():any{
    return this.loginInfo.get("password")
  }
  get newName():any{
    return this.signUpInfo.get('newName')
  }
  get newPass():any{
    return this.signUpInfo.get('newPass')
  }

  set username(inp:string){
    this.loginInfo.setValue({username:inp})
  }
  set password(inp:string){
    this.loginInfo.setValue({password:inp})
  }


}
