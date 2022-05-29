import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { SubEntry } from 'src/app/structs';

@Component({
  selector: 'app-workout-item',
  templateUrl: './workout-item.component.html',
  styleUrls: ['./workout-item.component.css']
})
export class WorkoutItemComponent implements OnInit {
  @Input() data!:SubEntry;

  constructor() { }

  ngOnInit(): void {
  }

}
