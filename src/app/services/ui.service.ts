import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private subject = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<string>("default");
  private optionSubject = new BehaviorSubject<string>("default");

  constructor() { }

  setUsernameStatus(inp:boolean){
    this.subject.next(inp);
  }

  getUsernameStatus(){
    return this.subject.asObservable();
  }

  setUsername(inp:string){
    this.userSubject.next(inp);
  }
  getUsername(){
    return this.userSubject.asObservable();
  }

  getOption(){
    return this.optionSubject.asObservable();
  }
  setOption(inp:string){
    this.optionSubject.next(inp);
  }
}
