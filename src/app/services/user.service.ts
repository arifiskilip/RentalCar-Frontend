import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponse } from '../models/genericResponse';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  private url:string="http://localhost:17109/";


  getUser(userId:string):Observable<GenericResponse<User>>{
    return this.http.get<GenericResponse<User>>(this.url+"api/Users/GetUser?userId="+userId);
  }

  updateUser(user:User):Observable<GenericResponse<null>>{
    return this.http.post<GenericResponse<null>>(this.url+"api/Users/Update",user);
  }
}
