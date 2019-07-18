import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { LandingBookingListComponent } from './landing/landing-booking-list/landing-booking-list.component';
import { CustomerFormComponent } from './customer/customer-form/customer-form.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './auth/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { LandingLoginComponent } from './landing/auth/login/login.component';
import { LandingRegisterComponent } from './landing/auth/register/register.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

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
    LandingBookingListComponent,
    CustomerFormComponent,
    CustomerListComponent,
    HomeComponent,
    HeaderComponent,
    PageLoaderComponent,
    LoginComponent,
    LandingLoginComponent,
    LandingRegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
    }),
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatGridListModule,
    MatAutocompleteModule,
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
