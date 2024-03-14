import { Component, OnInit } from '@angular/core';
import { Car } from '../../../models/car';
import { CarService } from '../../../services/car.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from '../../../models/brand';
import { Color } from '../../../models/color';
import { BrandService } from '../../../services/brand.service';
import { ColorService } from '../../../services/color.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-car',
  templateUrl: './admin-car.component.html',
  styleUrl: './admin-car.component.css'
})
export class AdminCarComponent implements OnInit{
  ngOnInit(): void {
    this.getAll();
    this.brandsWithColors();
    this.createCarForm();
  
  }

  cars:Car[];
  brands:Brand[];
  colors:Color[];
  getCar:Car = new Car();
  carForm:FormGroup;
  
  /**
   *
   */
  constructor(private carService:CarService, private formBuilder:FormBuilder,
    private toastr:ToastrService, private brandService:BrandService,
    private colorService:ColorService) {

    
  }



  getAll(){
    this.carService.getAllWithColorAndBrand().subscribe(res=>{
       this.cars = res.data;
    },err=> console.log(err))
  }

  createCarForm(){
    this.carForm = this.formBuilder.group({
      id:[""],
      brandId:[''],
      colorId:[''],
      modelName:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
    })
  }


  update(){
    if(this.carForm.valid){
      let updateCar:Car = Object.assign({},this.carForm.value);
      console.log(updateCar)
      this.carService.update(updateCar).subscribe(res=>{
        this.getAll();
        this.toastr.success(res.message,"Başarılı!")
        
      },err=>{
        console.log(err)
        this.toastr.error(err.message);
      })
    }
    else{
      this.toastr.warning("Marka adı boş geçilemez.","Uyarı")
    }
  }


  getById(id:number){
    console.log(id)
    this.carService.getCarById(id).subscribe(res=>{
      this.getCar = res.data
      this.carForm.get('id')?.setValue(res.data.id);
      this.carForm.get('brandId')?.setValue(res.data.brandId);
      this.carForm.get('colorId')?.setValue(res.data.colorId);
      this.carForm.get('modelName')?.setValue(res.data.modelName);
      this.carForm.get('modelYear')?.setValue(res.data.modelYear);
      this.carForm.get('dailyPrice')?.setValue(res.data.dailyPrice);
      this.carForm.get('description')?.setValue(res.data.description);
      console.log(this.getCar)
    },err=> console.log(err));
  }

  deleteCar(car:Car){
    this.carService.delete(car.id).subscribe(res=>{
      this.toastr.success(res.message,"Başarılı")
      this.getAll();
    },err=>console.log(err))
  }

  add(){
    if(this.carForm.valid){
      let addedCar:Car = Object.assign({},this.carForm.value);
      addedCar.id=0;
      console.log(addedCar)
      this.carService.add(addedCar).subscribe(res=>{
        this.getAll();
        this.toastr.success(res.message,"Başarılı!")
        
      },err=>{
        console.log(err)
        this.toastr.error(err.message);
      })
    }
    else{
      this.toastr.warning("Marka adı boş geçilemez.","Uyarı")
    }
  }

  clearCarForm(){
    this.carForm.reset();
  }

  brandsWithColors(){
    this.brandService.getAll().subscribe(res=>{
      this.brands = res.data
      this.colorService.getAll().subscribe(res=>{
        this.colors = res.data
      })
    })
  }
}
