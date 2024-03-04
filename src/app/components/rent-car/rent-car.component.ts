import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { Tools } from '../../tools/tools';

@Component({
  selector: 'app-rent-car',
  templateUrl: './rent-car.component.html',
  styleUrl: './rent-car.component.css'
})
export class RentCarComponent implements OnInit {
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.carId = params["carId"];
      this.getCarDetail();
    })
    
  }

  car:Car;
  rentDate:Date;
  returnDate:Date;
  carId:number;
  tool = new Tools();

 constructor(private router:Router, private activatedRoute:ActivatedRoute, 
   private carService:CarService,private toastr:ToastrService) {
 }



 checkDate(){
   if(this.rentDate < this.returnDate && this.rentDate!==undefined && this.returnDate!==undefined && this.rentDate){
     this.router.navigate(["/payment"],{
       queryParams:{carId:this.carId,rentdate:this.rentDate,returndate:this.returnDate}
     });
   }
   else{
     this.toastr.error("Tarih alanları lütfen geçerli bir aralıkta seçiniz.","Hata")
   }
 }

 getCarDetail(){
   this.carService.getCarById(this.carId).subscribe(res=>{
     if(res.success){
       this.car = res.data
     }
   });
 }
}
