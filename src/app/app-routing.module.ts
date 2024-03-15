import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './components/cars/cars.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentCarComponent } from './components/rent-car/rent-car.component';
import { PaymentDetailComponent } from './components/payment-detail/payment-detail.component';
import { AdminBrandComponent } from './components/admin/admin-brand/admin-brand.component';
import { AdminColorComponent } from './components/admin/admin-color/admin-color.component';
import { AdminCarComponent } from './components/admin/admin-car/admin-car.component';
import { AdminCarImagesComponent } from './components/admin/admin-car-images/admin-car-images.component';
import { AccountLayoutComponent } from './components/account/account-layout/account-layout.component';
import { AccountLoginComponent } from './components/account/account-login/account-login.component';
import { AccountRegisterComponent } from './components/account/account-register/account-register.component';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  {path:"",component:CarsComponent},
{path:"cars",component:CarsComponent},
{path:"cars/brand/:brandId",component:CarsComponent},
{path:"cars/color/:colorId",component:CarsComponent},
{path:"rentcar/:carId",component:RentCarComponent},
{path:"payment",component:PaymentComponent},
{path:"paymentdetail/:rentalId",component:PaymentDetailComponent},
{path:"admin/brands",component:AdminBrandComponent, canActivate:[LoginGuard]},
{path:"admin/colors",component:AdminColorComponent, canActivate:[LoginGuard]},
{path:"admin/cars",component:AdminCarComponent, canActivate:[LoginGuard]},
{path:"admin/car/:carId/images",component:AdminCarImagesComponent, canActivate:[LoginGuard]},
{path:"account",component:AccountLayoutComponent, children:[
  {path:"login",component:AccountLoginComponent, canActivate:[LoginGuard]},
  {path:"register",component:AccountRegisterComponent},
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
