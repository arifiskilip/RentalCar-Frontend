import { Tools } from './../../../tools/tools';
import { CarImage } from './../../../models/carImage';
import { Component, OnInit } from '@angular/core';
import { CarImagesService } from '../../../services/car-images.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-car-images',
  templateUrl: './admin-car-images.component.html',
  styleUrl: './admin-car-images.component.css'
})
export class AdminCarImagesComponent implements OnInit {
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params['carId']){
        this.carId = params['carId']
        this.getCarCarIdByCarImages(this.carId);
      }
    })
  }

  tool:Tools = new Tools();
  carImages:CarImage[];
  carImage:CarImage = new CarImage();
  file: File;
  carId:number;
  /**
   *
   */
  constructor(private carImagesService:CarImagesService,
    private activatedRoute:ActivatedRoute, private toastr:ToastrService) {
    
  }

  getCarCarIdByCarImages(carId:number){
    this.carImagesService.getCarIdByCarImages(carId).subscribe(res=>{
      this.carImages = res.data
    })
  }

  setCarImage(carImage:CarImage){
    this.carImage = carImage;
  }

  deleteCarImage(){
    console.log(this.carImage);
    this.carImagesService.delete(this.carImage.id).subscribe(res=>{
      this.toastr.success(res.message,"Başarılı");
      this.getCarCarIdByCarImages(this.carImage.carId);
    },err=> this.toastr.error(err.error.message,"Hata"));
  }

  add(){  
    if(this.file){
      this.carImagesService.add(this.carId,this.file).subscribe(res=>{
        this.toastr.success(res.message,"Başarılı");
        this.getCarCarIdByCarImages(this.carId);
      },err=>{
        this.toastr.error(err.error.message,"Hata");
      })
    }
    else{
      this.toastr.warning("Lütfen bir resim seçiniz","Uyarı");
    }
  }

  // Dosya seçildiğinde bu fonksiyon çağrılabilir
onFileSelected(event: any) {
    this.file = event.target.files[0];
}
}
