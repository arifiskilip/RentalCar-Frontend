import { CustomerService } from './../../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrl: './account-edit.component.css'
})
export class AccountEditComponent implements OnInit {
  ngOnInit(): void {
    this.getUser();
  }

  user:User = new User();
  selectedImage:string;
  constructor(private userService:UserService, private authService:AuthService,
    private toastr:ToastrService) {
    
    
  }


  getUser(){
    this.userService.getUser(this.authService.getUserId()).subscribe(res=>{
      this.user = Object.assign({},res.data)
    },err=>{
      this.toastr.error(err.error.message,"Hata")
    })
  }

  onFileSelected(event:any){
    const file: File = event.target.files[0]; // Seçilen dosyayı al
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.selectedImage = e.target.result; // Resmin URL'sini al
    };

    reader.readAsDataURL(file); // Dosyayı oku ve URL'sini al
  }

  updateUser(){
    this.userService.updateUser(this.user).subscribe(res=>{
      this.toastr.success(res.message,"Başarılı");
      this.getUser();
    },err=>{
      console.log(err);
    })
  }

}
