import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from '../models/genericResponse';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private http:HttpClient) { }

  private url:string="http://localhost:17109/";

  checkCarRental(id:number):Observable<GenericResponse<null>>{
    return this.http.get<GenericResponse<null>>(this.url+"api/Rentals/CheckCarRental?carId="+id);
  }

  add(rental:Rental):Observable<GenericResponse<Rental>>{
    return this.http.post<GenericResponse<Rental>>(this.url+"api/Rentals/Add",rental);
  }
}
