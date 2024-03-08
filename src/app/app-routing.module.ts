import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './components/cars/cars.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentCarComponent } from './components/rent-car/rent-car.component';
import { PaymentDetailComponent } from './components/payment-detail/payment-detail.component';
import { AdminBrandComponent } from './components/admin/admin-brand/admin-brand.component';

const routes: Routes = [
  {path:"",component:CarsComponent},
{path:"cars",component:CarsComponent},
{path:"cars/brand/:brandId",component:CarsComponent},
{path:"cars/color/:colorId",component:CarsComponent},
{path:"rentcar/:carId",component:RentCarComponent},
{path:"payment",component:PaymentComponent},
{path:"paymentdetail/:rentalId",component:PaymentDetailComponent},
{path:"admin/brands",component:AdminBrandComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
