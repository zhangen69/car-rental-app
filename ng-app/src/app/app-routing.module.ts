import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarFormComponent } from './car/car-form/car-form.component';
import { CarListComponent } from './car/car-list/car-list.component';
import { LandingIndexComponent } from './landing/landing-index/landing-index.component';
import { LandingCarListComponent } from './landing/landing-car-list/landing-car-list.component';
import { LandingViewCarComponent } from './landing/landing-view-car/landing-view-car.component';
import { LandingBookingListComponent } from './landing/landing-booking-list/landing-booking-list.component';
import { LandingViewBookingComponent } from './landing/landing-view-booking/landing-view-booking.component';
import { LoginComponent } from './auth/login/login.component';
import { LandingRegisterComponent } from './landing/auth/register/register.component';
import { LandingLoginComponent } from './landing/auth/login/login.component';
import { BookingFormComponent } from './booking/booking-form/booking-form.component';
import { BookingListComponent } from './booking/booking-list/booking-list.component';
import { HomeComponent } from './home/home.component';
import { CustomerFormComponent } from './customer/customer-form/customer-form.component';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'car',
        children: [
          { path: 'add', component: CarFormComponent },
          { path: 'list', component: CarListComponent },
          { path: 'edit/:id', component: CarFormComponent },
        ]
      },
      {
        path: 'booking',
        children: [
          { path: 'add', component: BookingFormComponent },
          { path: 'list', component: BookingListComponent },
          { path: 'edit/:id', component: BookingFormComponent },
        ]
      },
      {
        path: 'customer',
        children: [
          { path: 'add', component: CustomerFormComponent },
          { path: 'list', component: CustomerListComponent },
          { path: 'edit/:id', component: CustomerFormComponent },
        ]
      },
      {
        path: 'auth',
        children: [{ path: 'login', component: LoginComponent }]
      }
    ]
  },
  {
    path: '',
    children: [
      { path: '', component: LandingIndexComponent },
      {
        path: 'car',
        children: [
          { path: 'list', component: LandingCarListComponent },
          { path: 'view', component: LandingViewCarComponent }
        ]
      },
      {
        path: 'booking',
        children: [
          { path: 'list', component: LandingBookingListComponent },
          { path: 'view', component: LandingViewBookingComponent }
        ]
      },
      {
        path: 'auth',
        children: [
          { path: 'login', component: LandingLoginComponent },
          { path: 'register', component: LandingRegisterComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
