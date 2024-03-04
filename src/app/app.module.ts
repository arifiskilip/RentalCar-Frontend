import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarsSearchPipe } from './pipes/cars-search.pipe';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { VatCalculatePipe } from './pipes/vat-calculate.pipe';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarsComponent } from './components/cars/cars.component';
import { CarsFilterComponent } from './components/cars-filter/cars-filter.component';
import { LeftbarComponent } from './components/leftbar/leftbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentDetailComponent } from './components/payment-detail/payment-detail.component';
import { RentCarComponent } from './components/rent-car/rent-car.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CarsSearchPipe,
    VatAddedPipe,
    VatCalculatePipe,
    CarDetailComponent,
    CarsComponent,
    CarsFilterComponent,
    LeftbarComponent,
    NavbarComponent,
    PaymentComponent,
    PaymentDetailComponent,
    RentCarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
