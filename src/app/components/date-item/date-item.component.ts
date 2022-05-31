import { Component, OnInit, Input } from '@angular/core';
import { SubEntry } from 'src/app/structs';

@Component({
  selector: 'app-date-item',
  templateUrl: './date-item.component.html',
  styleUrls: ['./date-item.component.css']
})
export class DateItemComponent implements OnInit {
  @Input() dateEntries!:SubEntry[];

  clicked:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  click(){
    this.clicked = !this.clicked;
  }

}
