import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { LoginModel } from '../../../models/loginModel';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrl: './account-login.component.css'
})
export class AccountLoginComponent implements OnInit {

  ngOnInit(): void {
    this.createLoginForm();
  }

  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private toastr:ToastrService,
    private authService:AuthService, private localStorage:LocalStorageService,
    private router:Router) {
    
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel:LoginModel = Object.assign({},this.loginForm.value);
      this.authService.login(loginModel).subscribe(res=>{
        this.localStorage.add(res.data.token);
        this.toastr.success(res.message,"Başarılı");
        this.router.navigate(["cars"]);
      },err=> this.toastr.error(err.error.message,"Hata"));
    }
    else{
      this.toastr.warning("Lütfen ilgili alanları doldurunuz.","Uyarı")
    }
  }
}
