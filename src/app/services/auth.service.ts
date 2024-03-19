import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { GenericResponse } from '../models/genericResponse';
import { TokenModel } from '../models/tokenModel';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from "jwt-decode";

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

  getRoles() : string[]{
    const token = this.localStorage.get();
    var roles:string[]= [];
    if(token != null){
      const decodedToken:any = jwtDecode(token);
      roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      return roles;
    }
    return roles;
  }

  hasRole(role:string):boolean{
    var roles = this.getRoles();
    var spliteRole = role.split(',');
    for (let index = 0; index < spliteRole.length; index++) {
      if(roles.includes(spliteRole[index])){
        return true;
      }
    }
    
    return false;
  }

  getUserId():string{
    const token = this.localStorage.get();
    var userId:string="";
    if(token != null){
      const decodedToken:any = jwtDecode(token);
      userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      return userId;
    }
    return userId;
  } 

}
