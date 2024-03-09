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

  getById(id:number):Observable<GenericResponse<Brand>>{
    return this.http.get<GenericResponse<Brand>>(this.url+`api/Brands/GetById?id=${id}`);
  }

  update(brand:Brand):Observable<GenericResponse<null>>{
    return this.http.post<GenericResponse<null>>(this.url+"api/Brands/Update",brand);
  }
  delete(id:number):Observable<GenericResponse<null>>{
    return this.http.post<GenericResponse<null>>(this.url+'api/Brands/Delete?id='+id,null)
  }

  add(brand:Brand):Observable<GenericResponse<Brand>>{
    return this.http.post<GenericResponse<Brand>>(this.url+"api/Brands/Add",brand);
  }
}
