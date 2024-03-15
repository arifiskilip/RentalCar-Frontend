import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { GenericResponse } from '../models/genericResponse';
import { TokenModel } from '../models/tokenModel';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url:string="http://localhost:17109/";
  constructor(private http:HttpClient, private localStorage:LocalStorageService,
    private toastr:ToastrService) { }


  login(loginModel:LoginModel):Observable<GenericResponse<TokenModel>>{
    return this.http.post<GenericResponse<TokenModel>>(this.url + "api/Auth/login", loginModel)
  }

  isAuthenticated():Boolean{
    if(localStorage.getItem('token')){
      return true;
    }
    else{
      return false;
    }
  }

  logOut(){
      this.localStorage.clear();
      this.toastr.success("Çıkış işlemi başarılı.","Başarılı");
  }

}
