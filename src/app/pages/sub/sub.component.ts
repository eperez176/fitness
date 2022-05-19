import { Component, OnInit } from '@angular/core';
import { FormsModule, Validators, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors  } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sub',
  templateUrl: './sub.component.html',
  styleUrls: ['./sub.component.css']
})
export class SubComponent implements OnInit {

  validUsername!:boolean;
  subValid!:Subscription;

  constructor(private fb:FormBuilder, private dataService:DataService, private uiService:UiService) { }

  ngOnInit(): void {
    this.subValid = this.uiService.getUsernameStatus().subscribe(r => {
      this.validUsername = r;
    })
  }

  addEntry(){
    console.log("entry")
    console.log(this.subForm)
  }

  // Form builder
  subForm = this.fb.group({
    rep:['',{validators:[
      Validators.required,
      this.checkNum()
      ]}],
    weight:['',{validators:[
      Validators.required,
      this.checkNum()
      ]}],
    set:['',{validators:[
      Validators.required
    ]}],
    split:['',{validators:[
      Validators.required
    ]}]
  })
  
  checkNum():ValidatorFn { // Validates if the input is a number
    return (control:AbstractControl): ValidationErrors | null => {
      const valid = typeof  +control.value === "number" && !isNaN(+control.value)
      return (valid)? null:{numTrue:true};
    }
  }

  setTwo(inp:number):boolean {
    console.log(inp)
    if(inp >= 2)
      return true
    else
      return false
  }

  get rep():any {
    return this.subForm.get("rep")
  }
  get set():any{
    return this.subForm.get("set")
  }

}
