import { Component, OnInit, ViewChild } from '@angular/core';
import { Color } from '../../../models/color';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColorService } from '../../../services/color.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-color',
  templateUrl: './admin-color.component.html',
  styleUrl: './admin-color.component.css'
})
export class AdminColorComponent implements OnInit {
  ngOnInit(): void {
    this.createColorForm();
    this.getAll();
    
  }

  colors:Color[];
  getColor:Color = new Color();
  colorForm:FormGroup;

  /**
   *
   */
  constructor(private colorService:ColorService, private formBuilder:FormBuilder
    , private toastr:ToastrService) {
  }

  createColorForm(){
    this.colorForm = this.formBuilder.group({
      id:[""],
      name:["",Validators.required]
    })
  }

  update(){
    if(this.colorForm.valid){
      let updateColor:Color = Object.assign({},this.colorForm.value);
      this.colorService.update(updateColor).subscribe(res=>{
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
    this.colorService.getAll().subscribe(res=>{
      this.colors = res.data
    },err=> console.log(err))
  }

  getById(id:number){
    this.colorService.getById(id).subscribe(res=>{
      this.getColor = res.data
      this.colorForm.get('name')?.setValue(res.data.name);
      this.colorForm.get('id')?.setValue(res.data.id);
      console.log(this.getColor)
    },err=> console.log(err));
  }

  deleteBrand(color:Color){
    this.colorService.delete(color.id).subscribe(res=>{
      this.toastr.success(res.message,"Başarılı")
      this.getAll();
    },err=>console.log(err))
  }

  add(){
    if(this.colorForm.valid){
      let addedColor:Color = Object.assign({},this.colorForm.value);
      addedColor.id=0;
      this.colorService.add(addedColor).subscribe(res=>{
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
