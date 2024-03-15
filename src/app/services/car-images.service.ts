import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarImage } from '../models/carImage';
import { GenericResponse } from '../models/genericResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarImagesService {

  private url:string="http://localhost:17109/";
  constructor(private http:HttpClient) { }

  getAll():Observable<GenericResponse<CarImage[]>>{
    return this.http.get<GenericResponse<CarImage[]>>(this.url+"api/Brands/GetAll");
  }

  getCarIdByCarImages(carId:number){
    return this.http.get<GenericResponse<CarImage[]>>(
      this.url+'api/CarImages/CarIdByCarImages?id='+carId);
  }

  delete(carImageId:number){
    return this.http.post<GenericResponse<null>>(
      this.url+"api/CarImages/Delete?carImageId="+carImageId,null
    );
  }

  add(carId:number,file:File){
    const formData:FormData = new FormData();
    formData.append("carId",carId.toString());
    formData.append("file",file);
    console.log(formData.get("file"))
    return this.http.post<GenericResponse<CarImage>>(this.url+"api/CarImages/Add",formData);
  }
}
