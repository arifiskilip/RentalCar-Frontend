import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponse } from '../models/genericResponse';
import { Color } from '../models/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private http:HttpClient) { }

  private url:string="http://localhost:17109/";

  getAll():Observable<GenericResponse<Color[]>>{
    return this.http.get<GenericResponse<Color[]>>(this.url+"api/Colors/GetAll");
  }
}
