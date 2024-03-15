import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
  
  constructor(private authService:AuthService) {
    
  }
  
  auth = this.authService;
  isAuthenticated:Boolean;
  


  logOut(){
    this.authService.logOut();
    this.isAuthenticated = this.authService.isAuthenticated();
  }
}
