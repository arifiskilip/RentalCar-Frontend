import { Component, OnInit } from '@angular/core';
import { GenericResponse } from '../../models/genericResponse';
import { Car } from '../../models/car';
import { Tools } from '../../tools/tools';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalService } from '../../services/rental.service';
import { CarService } from '../../services/car.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent implements OnInit{

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId'] && params['colorId']) {
        console.log(params['brandId'], params['colorId'])
        this.getAllByBrandIdAndColorId(params['brandId'], params['colorId']);
      } else if (params['brandId']) {
        this.getAllByBrandId(params['brandId']);
      } else if (params['colorId']) {
        this.getAllByColorId(params['colorId']);
      } else {
        this.getAll();
      }
    });

    this.activatedRoute.queryParams.subscribe((query)=>{
      if(query["brandId"] && query["colorId"]){
        this.getAllByBrandIdAndColorId(parseInt(query["brandId"]),parseInt(query["colorId"]));
      }
      else if(query["brandId"] && query["colorId"] === ""){
        this.getAllByBrandId(parseInt(query["brandId"]));
      }
      else if(query["brandId"] === "" && query["colorId"]){
        this.getAllByColorId(parseInt(query["colorId"]));
      }
      else if(query["brandId"] === "" && query["colorId"] === ""){
        this.getAll();
      }
      else{
        this.getAll();
      }
    })
  }

  tool:Tools = new Tools();
  cars: GenericResponse<Car[]>;
  selectedCarDetails: Car;
  searchText:string="";
  

  constructor( private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private rentalService:RentalService,
    private router:Router, private toastr:ToastrService) {
    
  }

  openCarDetailModal(car: Car) {
    this.selectedCarDetails = car;
  }

  getAll() {
    this.carService.getAllWithColorAndBrand().subscribe((resp) => {
      this.cars = resp;
    });
  }

  getAllByBrandId(brandId: number) {
    this.carService.getAllWithBrandId(brandId).subscribe((resp) => {
      this.cars = resp;
    });
  }

  getAllByColorId(colorId: number) {
    this.carService.getAllWithBrandId(colorId).subscribe((resp) => {
      this.cars = resp;
    });
  }
  getAllByBrandIdAndColorId(brandId: number, colorId: number) {
    this.carService
      .getAllWithBrandIdAndColorId(brandId, colorId)
      .subscribe((resp) => {
        this.cars = resp;
      });
  }

  cehckCarRental(cardId:number){
     this.rentalService.checkCarRental(cardId).subscribe(res=>{
          this.router.navigateByUrl("rentcar/"+cardId)
    },err=>{
      console.log(err)
      this.toastr.warning(err.error.message)
    })
}

}
