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
      ]}]
  })
  
  checkNum():ValidatorFn { // Validates if the input is a number
    return (control:AbstractControl): ValidationErrors | null => {
      const valid = typeof  +control.value === "number" && !isNaN(+control.value)
      return (valid)? null:{numTrue:true};
    }
  }

  get rep():any {
    return this.subForm.get("rep")
  }

}
