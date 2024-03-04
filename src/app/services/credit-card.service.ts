import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from '../models/genericResponse';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor(private http:HttpClient) { }

  private url:string="http://localhost:17109/";

  checkCreditCard(creditCard:CreditCard):Observable<GenericResponse<null>>{
    return this.http.get<GenericResponse<null>>(this.url+`api/CreditCard?CardOwner=
    ${creditCard.cardOwner}&CardNumber=${creditCard.cardNumber}&ExpirationDate=${creditCard.expirationDate}
    &CVV=${creditCard.cvv}`);
  }

}
