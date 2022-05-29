import { Component, OnInit } from '@angular/core';
import { FormsModule, Validators, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors  } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SubEntry, monthDays } from 'src/app/structs';

@Component({
  selector: 'app-sub',
  templateUrl: './sub.component.html',
  styleUrls: ['./sub.component.css']
})
export class SubComponent implements OnInit {

  // Subscription
  subValid!:Subscription;
  subDate!:Subscription;
  subUsername!:Subscription;

  validUsername!:boolean;
  entry!:SubEntry;

  dateErrorMsg:string ='Please Enter Value';
  username!:string;

  constructor(private fb:FormBuilder, private dataService:DataService, private uiService:UiService, private router:Router) { }

  ngOnInit(): void {
    this.subValid = this.uiService.getUsernameStatus().subscribe(r => {
      this.validUsername = r;
    });

    this.subUsername = this.uiService.getUsername().subscribe(r => {
      this.username = r;
    })

    this.subForm.get('date')?.valueChanges.subscribe(r => {
      const error:ValidationErrors = {checkDateError:'Invalid Format'};
      console.log(this.subForm.get('date')?.hasError('dateFormatError'))
      console.log(error);
      if(this.subForm.get('date')?.hasError('dateFormatError'))
      {
        this.dateErrorMsg = 'Invalid format';
      }
      else if(this.subForm.get('date')?.hasError('dateYearError'))
      {
        this.dateErrorMsg = 'Invalid Year'
      }
      else if(this.subForm.get('date')?.hasError('dateMonthError'))
      {
        this.dateErrorMsg = 'Invalid Month'
      }
      else if(this.subForm.get('date')?.hasError('dateDayError'))
      {
        this.dateErrorMsg = 'Invalid Day'
      }
      else{
        this.dateErrorMsg = '';
      }
    })
  }

  addEntry(){ // The next thing is to prevent submission  
    console.log(this.subForm)
    this.entry = {
      username:this.username,
      workout_split:this.subForm.get('split')?.value,
      date:this.subForm.get('date')?.value,
      start_time:this.subForm.get('sTime')?.value,
      end_time:this.subForm.get('eTime')?.value,
      num_of_sets:this.subForm.get('set')?.value,
      workout_type:this.subForm.get('workout_type')?.value,
      focus:this.subForm.get('focus')?.value,

      set1_form:this.subForm.get('set1_form')?.value,
      set1_rep:this.subForm.get('set1_rep')?.value,
      set1_weight:this.subForm.get('set1_weight')?.value,

      set2_form:this.subForm.get('set2_form')?.value,
      set2_rep:this.subForm.get('set2_rep')?.value,
      set2_weight:this.subForm.get('set2_weight')?.value,

      set3_form:this.subForm.get('set3_form')?.value,
      set3_rep:this.subForm.get('set3_rep')?.value,
      set3_weight:this.subForm.get('set3_weight')?.value,

      set4_form:this.subForm.get('set4_form')?.value,
      set4_rep:this.subForm.get('set4_rep')?.value,
      set4_weight:this.subForm.get('set4_weight')?.value,
      
      set5_form:this.subForm.get('set5_form')?.value,
      set5_rep:this.subForm.get('set5_rep')?.value,
      set5_weight:this.subForm.get('set5_weight')?.value,
      
      set6_form:this.subForm.get('set6_form')?.value,
      set6_rep:this.subForm.get('set6_rep')?.value,
      set6_weight:this.subForm.get('set6_weight')?.value,
    }

    this.dataService.newEntry(this.entry).subscribe(r => {
      console.log("new entry!")
    });

    this.router.navigate(['/']);
  }

  goHome(){
    this.router.navigate(['/']);
  }

  // Form builder
  subForm = this.fb.group({
    set1_rep:['',{validators:[
      this.checkNum()
      ]}],
    set1_weight:['',{validators:[
      this.checkNum()
      ]}],
    set1_form:[''],
    set2_rep:['',{validators:[
      this.checkNum()
      ]}],
    set2_weight:['',{validators:[
      this.checkNum()
      ]}],
    set2_form:[''],
    set3_rep:['',{validators:[
      this.checkNum()
      ]}],
    set3_weight:['',{validators:[
      this.checkNum()
      ]}],
    set3_form:[''],
    set4_rep:['',{validators:[
      this.checkNum()
      ]}],
    set4_weight:['',{validators:[
      this.checkNum()
      ]}],
    set4_form:[''],
    set5_rep:['',{validators:[
      this.checkNum()
      ]}],
    set5_weight:['',{validators:[
      this.checkNum()
      ]}],
    set5_form:[''],
    set6_rep:['',{validators:[
      this.checkNum()
    ]}],
    set6_weight:['',{validators:[
      this.checkNum()
    ]}],
    set6_form:[''],
    set:['',{validators:[
      Validators.required
    ]}],
    split:['',{validators:[
      Validators.required
    ]}],
    date:['',{validators:[
      this.checkDate()
    ]}],
    sTime:['',{validators:[
      this.checkTime()
    ]}],
    eTime:['',{validators:[
      this.checkTime()
    ]}],
    workout_type:['',{validators:[
    ]}],
    focus:['']
  })
  
  checkNum():ValidatorFn { // Validates if the input is a number
    return (control:AbstractControl): ValidationErrors | null => {
      const valid = typeof  +control.value === "number" && !isNaN(+control.value)
      return (valid)? null:{numTrue:true};
    }
  }

  checkDate():ValidatorFn{ // Validates if the input is a date
    return (control:AbstractControl): ValidationErrors | null =>{
      var v = true;
      const currentDate = new Date();


      const date_array = control.value.split('-');

      // Check if the format is correct
      if(date_array.length != 3)
        return {dateFormatError:'Invalid Format'};

      // Check the year
      const year = parseInt(date_array[0]);
      if( !(year > 0 && year <= currentDate.getFullYear()))
        return {dateYearError:'Invalid Year'};
      // Check the month
      const month = parseInt(date_array[1]);
      if( !(month > 0 && month < 13))
        return {dateMonthError:'Invalid Month'}
      // Check the day
      const day = parseInt(date_array[2]);
      if( !(day > 0 && day <= monthDays[month-1]) )
        return {dateDayError:'Invalid Day'}
        
      return (v)? null:{checkDateError:false}
    }
  }

  checkTime():ValidatorFn { // Validates if the time is valid
    return (control:AbstractControl): ValidationErrors | null => {
      var v:boolean = true;
      const time_array = control.value.split(':');
      
      // Time Format Check
      if(time_array.length != 2)
        return {timeError:'Invalid Format'}
      
      // Hour Check
      const hour = parseInt(time_array[0]);
      if(!(hour >= 0 && hour < 24))
        return {timeError:'Invalid Hour'}

      // Minute Check
      const min = parseInt(time_array[1]);
      if(!(min >=0 && min <= 60))
        return {timeError:'Invalid Min'}

      return v? null:{timeError:false}
    }
  }

  get rep():any {
    return this.subForm.get("rep")
  }
  get set():any{
    return this.subForm.get("set")
  }
  get date():any{
    return this.subForm.get("date");
  }

}
