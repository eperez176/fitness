import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { SubEntry } from 'src/app/structs';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-workout-item',
  templateUrl: './workout-item.component.html',
  styleUrls: ['./workout-item.component.css']
})
export class WorkoutItemComponent implements OnInit {
  @Input() data!:SubEntry;
  option!:string;
  optionSub!:Subscription;
  clicked:boolean = false;

  constructor(private uiService:UiService) {
    console.log(this.option)
   }

  ngOnInit(): void {
    this.optionSub = this.uiService.getOption().subscribe(r => this.option = r)
  }

  drop(){
    this.clicked = !this.clicked;
  }

}
