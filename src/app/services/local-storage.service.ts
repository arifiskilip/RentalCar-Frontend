import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  add(token:string){
    localStorage.setItem("token",token);
  }
  clear(){
    localStorage.clear();
  }
  get(){
    var token = localStorage.getItem("token");
    return token;
  }
}
