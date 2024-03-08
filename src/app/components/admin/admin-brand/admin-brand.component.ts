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
    this.createBrandUpdateForm();
    this.getAll();
    
  }

  brands:Brand[];
  getBrand:Brand = new Brand();
  brandUpdateForm:FormGroup;

  /**
   *
   */
  constructor(private brandService:BrandService, private formBuilder:FormBuilder, private toastr:ToastrService) {
  }

  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      id:[""],
      name:["",Validators.required]
    })
  }

  update(){
    if(this.brandUpdateForm.valid){
      let updateBrand:Brand = Object.assign({},this.brandUpdateForm.value);
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
      this.brandUpdateForm.get('name')?.setValue(res.data.name);
      this.brandUpdateForm.get('id')?.setValue(res.data.id);
      console.log(this.getBrand)
    },err=> console.log(err));
  }

}
