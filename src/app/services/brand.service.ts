import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponse } from '../models/genericResponse';
import { Brand } from '../models/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private url:string="http://localhost:17109/";
  constructor(private http:HttpClient) { }


  getAll():Observable<GenericResponse<Brand[]>>{
    return this.http.get<GenericResponse<Brand[]>>(this.url+"api/Brands/GetAll");
  }
}
