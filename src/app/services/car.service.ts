import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Car } from '../models/car';
import { GenericResponse } from '../models/genericResponse';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private url:string="http://localhost:17109/";
  constructor(private http:HttpClient) { }

   getAllWithColorAndBrand():Observable<GenericResponse<Car[]>>{
    return this.http.get<GenericResponse<Car[]>>(this.url+"api/Cars/GetAllWithColorAndBrand");
  }


  getAllWithColorId(colorId:number):Observable<GenericResponse<Car[]>>{
    return this.http.get<GenericResponse<Car[]>>(this.url+`api/Cars/GetCarsByColorId?colorId=${colorId}`);
  }

  getAllWithBrandId(brandId:number):Observable<GenericResponse<Car[]>>{
    return this.http.get<GenericResponse<Car[]>>(this.url+`api/Cars/GetCarsByBrandId?brandId=${brandId}`);
  }

  getAllWithBrandIdAndColorId(brandId:number,colorId:number):Observable<GenericResponse<Car[]>>{
    return this.http.get<GenericResponse<Car[]>>(this.url+`api/Cars/GetAllByBrandIdAndColorId?brandId=${brandId}&colorId=${colorId}`);
  }

  getCarById(carId:number):Observable<GenericResponse<Car>>{
    return this.http.get<GenericResponse<Car>>(this.url+`api/Cars/GetCarById?carId=${carId}`);
  }
  update(car:Car):Observable<GenericResponse<null>>{
    return this.http.post<GenericResponse<null>>(this.url+"api/Cars/Update",car);
  }
  delete(id:number):Observable<GenericResponse<null>>{
    return this.http.post<GenericResponse<null>>(this.url+'api/Cars/Delete?id='+id,null)
  }

  add(car:Car):Observable<GenericResponse<Car>>{
    return this.http.post<GenericResponse<Car>>(this.url+"api/Cars/Add",car);
  }
}
