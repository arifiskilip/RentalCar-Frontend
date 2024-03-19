import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponse } from '../models/genericResponse';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  private url:string="http://localhost:17109/";


  getUserIdByCustomer(userId:string):Observable<GenericResponse<Customer>>{
    return this.http.get<GenericResponse<Customer>>(this.url+"api/Customers?userId="+userId);
}
}
