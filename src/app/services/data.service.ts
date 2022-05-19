import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from 'querystring';

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

  constructor(private http: HttpClient) { }

  login(username:string,password:string):Observable<any>{
    console.log('called...')
    const data = {username,password};
    //const url = 'http://localhost:10000/login/' + stringify(data);
    const url = 'https://fitness-db.azurewebsites.net/login/' + stringify(data);
    return this.http.get<any>(url,httpOptions);
  }
  newUser(username:string, password:string){
    console.log('New User...');
    const data = {username,password};
    console.log(data);
    //const url = 'http://localhost:10000/newUser';
    const url = 'https://fitness-db.azurewebsites.net/newUser';
    return this.http.post<any>(url,data,httpOptions);
  }


}
