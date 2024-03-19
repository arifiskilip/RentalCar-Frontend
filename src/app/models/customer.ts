import { Rental } from "./rental";
import { User } from "./user";

export class Customer{
    id:number;
    companyName:string;
    userId:number;
    user:User;
    rentals:Rental[]
}