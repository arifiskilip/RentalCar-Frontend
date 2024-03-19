import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if(this.isAuthenticated){
      this.getUser();
    }
  }
  
  constructor(private authService:AuthService,private userService:UserService) {
    
  }
  
  auth = this.authService;
  isAuthenticated:Boolean;
  user:User;


  logOut(){
    this.authService.logOut();
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  getUser(){
    this.userService.getUser(this.authService.getUserId()).subscribe(res=>{
      this.user = res.data
    },err=> console.log(err))
  }
}
