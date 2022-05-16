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
    const url = 'https://fitness-db.azurewebsite.net/login/' + stringify(data);
    return this.http.get<any>(url,httpOptions);
  }


}
