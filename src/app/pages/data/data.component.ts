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

  options:any;

  validUsername:boolean = false;
  retrieveData:boolean = false;
  username:string = '';

  split!:string;
  type!:string;
  date!:string;

  opt!:string;

  responseArray!:SubEntry[];

  dateEntry:SubEntry[][] = [];

  constructor(private router:Router, private uiService:UiService, private dataService:DataService, private fb:FormBuilder) { }

  dataForm = this.fb.group({
    date:[''],
    split:[''],
    type:[''],
    progress:[''],
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
    var date:string[] = [];
    const query:dataQuery = {
      date:this.dataForm.get('date')?.value,
      split:this.dataForm.get('split')?.value,
      type:this.dataForm.get('type')?.value,
      option:this.dataForm.get('option')?.value,
      progress:this.dataForm.get('progress')?.value,
      username:this.username
    }
    this.dataService.retrieveEntry(query).subscribe(r => {
      this.responseArray = r;

      console.log(r)

      if(query.option != 'date'){
        this.responseArray.forEach(r => {
          if(!date.includes(r.date)){ // Finds unique entries
            date.push(r.date);
          }
        })
      }

      var i = 0;
      date.forEach(d => { // Map different dates
        this.dateEntry[i] = this.responseArray.filter(doc => {
          if(doc.date == d){
            return doc;
          }
          else
            return ;
        });
        i += 1;
      })
      console.log(this.dateEntry);
      this.options = {
        legend:{
          data:['line1','line2'],
          align:'left'
        },
        xAxis:{
        },
        yAxis:{},
        series:[
        {
          name:'line1',
          type:'line',
          data:[1,2,4,8,16]
        },
        {
          name:'line2',
          type:'line',
          data:[1,3,9,27,81]
        },
      ]
      }
    });

    this.retrieveData = true;
    
    this.uiService.setOption(query.option);
  }

  get option(){
    return this.dataForm.get('option')?.value
  }

}
