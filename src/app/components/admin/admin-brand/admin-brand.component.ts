import { Component, OnInit } from '@angular/core';
import { Brand } from '../../../models/brand';
import { BrandService } from '../../../services/brand.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-brand',
  templateUrl: './admin-brand.component.html',
  styleUrl: './admin-brand.component.css'
})
export class AdminBrandComponent implements OnInit {
  ngOnInit(): void {
    this.createBrandForm();
    this.getAll();
    
  }

  brands:Brand[];
  getBrand:Brand = new Brand();
  brandForm:FormGroup;

  /**
   *
   */
  constructor(private brandService:BrandService, private formBuilder:FormBuilder, private toastr:ToastrService) {
  }

  createBrandForm(){
    this.brandForm = this.formBuilder.group({
      id:[""],
      name:["",Validators.required]
    })
  }


  update(){
    if(this.brandForm.valid){
      let updateBrand:Brand = Object.assign({},this.brandForm.value);
      console.log(updateBrand)
      this.brandService.update(updateBrand).subscribe(res=>{
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

  getAll(){
    this.brandService.getAll().subscribe(res=>{
      this.brands = res.data
    },err=> console.log(err))
  }

  getById(id:number){
    this.brandService.getById(id).subscribe(res=>{
      this.getBrand = res.data
      this.brandForm.get('name')?.setValue(res.data.name);
      this.brandForm.get('id')?.setValue(res.data.id);
      console.log(this.getBrand)
    },err=> console.log(err));
  }

  deleteBrand(brand:Brand){
    this.brandService.delete(brand.id).subscribe(res=>{
      this.toastr.success(res.message,"Başarılı")
      this.getAll();
    },err=>console.log(err))
  }

  add(){
    if(this.brandForm.valid){
      let addedBrand:Brand = Object.assign({},this.brandForm.value);
      addedBrand.id=0;
      console.log(addedBrand)
      this.brandService.add(addedBrand).subscribe(res=>{
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
}
