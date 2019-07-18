import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarFormComponent } from './car/car-form/car-form.component';
import { CarListComponent } from './car/car-list/car-list.component';
import { BookingFormComponent } from './booking/booking-form/booking-form.component';
import { BookingListComponent } from './booking/booking-list/booking-list.component';
import { LandingIndexComponent } from './landing/landing-index/landing-index.component';
import { LandingViewCarComponent } from './landing/landing-view-car/landing-view-car.component';
import { LandingCarListComponent } from './landing/landing-car-list/landing-car-list.component';
import { LandingViewBookingComponent } from './landing/landing-view-booking/landing-view-booking.component';
import { LandingLoginComponent } from './landing/landing-login/landing-login.component';
import { LandingRegisterComponent } from './landing/landing-register/landing-register.component';
import { LandingBookingListComponent } from './landing/landing-booking-list/landing-booking-list.component';
import { CustomerFormComponent } from './customer/customer-form/customer-form.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    CarFormComponent,
    CarListComponent,
    BookingFormComponent,
    BookingListComponent,
    LandingIndexComponent,
    LandingViewCarComponent,
    LandingCarListComponent,
    LandingViewBookingComponent,
    LandingLoginComponent,
    LandingRegisterComponent,
    LandingBookingListComponent,
    CustomerFormComponent,
    CustomerListComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
