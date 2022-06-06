import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from 'querystring';
import { dataQuery, SubEntry } from '../structs';

const httpOptions = {
  headers: new HttpHeaders (
    {
      'Content-Type': 'application/json'
    }
  )
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  //baseURL = 'http://localhost:10000';
  baseURL = 'https://fitness-db.azurewebsites.net'

  constructor(private http: HttpClient) { }

  login(username:string,password:string):Observable<any>{
    const data = {username,password};
    const url = this.baseURL +'/login/' + stringify(data);
    return this.http.get<any>(url,httpOptions);
  }
  newUser(username:string, password:string){
    const data = {username,password};
    const url = this.baseURL + '/newUser';
    return this.http.post<any>(url,data,httpOptions);
  }
  newEntry(entry:SubEntry){
    const url = this.baseURL + '/newEntry';
    return this.http.post<any>(url,entry,httpOptions);
    
  }
  retrieveEntry(data:dataQuery){
    const query = {option:data.option, type:data.type,date:data.date,split:data.split, username:data.username, progress:data.progress}
    const url = this.baseURL + '/retrieveData/' + stringify(query);
    return this.http.get<any>(url, httpOptions);
  }


}
