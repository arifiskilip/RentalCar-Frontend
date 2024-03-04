import { Component, OnInit } from '@angular/core';
import { CreditCard } from '../../models/creditCard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreditCardService } from '../../services/credit-card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Rental } from '../../models/rental';
import { RentalService } from '../../services/rental.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{
  ngOnInit(): void {
    this.createCreditCardkForm();

    this.activatedRoute.queryParams.subscribe(params=>{
      this.rental.carId= params["carId"];
      this.rental.rentDate= params["rentdate"];
      this.rental.returnDate= params["returndate"];
    })
  }

 rental:Rental = new Rental();
 creditCardForm:FormGroup;

constructor(private formBuilder:FormBuilder, private toastr:ToastrService, 
  private creditCartService:CreditCardService, private activatedRoute:ActivatedRoute,
  private rentalService:RentalService, private router:Router) {
 
  
}
 createCreditCardkForm(){
  this.creditCardForm = this.formBuilder.group({
    cardOwner:["",Validators.required],
    cardNumber:["",Validators.required],
    expirationDate:["",Validators.required],
    cvv:["",Validators.required],
  })
 }
 
 checkCreditCard(){
  if(this.creditCardForm.valid){
    var creditCard:CreditCard = Object.assign({},this.creditCardForm.value);
    this.creditCartService.checkCreditCard(creditCard).subscribe(res=>{
      if(res.success){
        this.rental.customerId=2;
        this.rentalService.add(this.rental).subscribe(res=>{
          if(res.success){
            this.toastr.success(res.message,"Başarılı");
            this.router.navigateByUrl(`/paymentdetail/${res.data.id}`)
          }
          else{
            this.toastr.error(res.message)
          }
        })
      }
      else{
        this.toastr.error(res.message,"Hata")
      }
    })
   
  }
  else{
    this.toastr.warning("Tüm alanları doldurunuz!","Uyarı");
  }
 }

}
