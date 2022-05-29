import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';
import { FormBuilder } from '@angular/forms';
import { dataQuery, SubEntry } from 'src/app/structs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  subStatus!:Subscription;
  subUsername!:Subscription;

  validUsername:boolean = false;
  retrieveData:boolean = false;
  username:string = '';

  split!:string;
  type!:string;
  date!:string;

  responseArray!:SubEntry[];

  constructor(private router:Router, private uiService:UiService, private dataService:DataService, private fb:FormBuilder) { }

  dataForm = this.fb.group({
    date:[''],
    split:[''],
    type:[''],
    option:['']
  })

  ngOnInit(): void {
    this.subStatus = this.uiService.getUsernameStatus().subscribe(r => this.validUsername = r);
    this.subUsername = this.uiService.getUsername().subscribe(r => this.username = r);
  }

  goHome(){
    this.router.navigate(['']);
  }
  retrieveEntry(){
    //console.log(this.dataForm)
    const query:dataQuery = {
      date:this.dataForm.get('date')?.value,
      split:this.dataForm.get('split')?.value,
      type:this.dataForm.get('type')?.value,
      option:this.dataForm.get('option')?.value,
      username:this.username
    }
    this.dataService.retrieveEntry(query).subscribe(r => {
      this.responseArray = r;
      console.log(this.responseArray)
    });

    console.log(query)
    this.retrieveData = true;
  }

  get option(){
    return this.dataForm.get('option')?.value
  }
}
