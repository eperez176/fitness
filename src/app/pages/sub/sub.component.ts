import { Component, OnInit } from '@angular/core';
import { FormsModule, Validators, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors  } from '@angular/forms';

@Component({
  selector: 'app-sub',
  templateUrl: './sub.component.html',
  styleUrls: ['./sub.component.css']
})
export class SubComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  addEntry(){
    console.log("entry")
  }

  // Form builder
  subForm = this.fb.group({
    rep:['',{validators:[
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
