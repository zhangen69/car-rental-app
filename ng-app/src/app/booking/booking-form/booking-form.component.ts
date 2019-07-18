import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import * as uuid from 'uuid';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.sass']
})
export class BookingFormComponent implements OnInit {
  now = moment().format('YYYY-MM-DD');
  formData = this.formBuilder.group({
    dateFrom: [this.now, Validators.required],
    dateTo: [this.now, Validators.required],
    car: ['', Validators.required],
    customer: ['', Validators.required],
    remarks: ['', Validators.required]
  });
  cars = JSON.parse(localStorage.getItem('cars')) || [];
  customers = JSON.parse(localStorage.getItem('customers')) || [];

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {}

  customerDisplayFn(data) {
    return data.name;
  }

  carDisplayFn(data) {
    return data.model;
  }

  onSubmit(formData) {
    let bookings = JSON.parse(localStorage.getItem('bookings'));

    if (bookings === null) {
      bookings = [];
    }

    const data = { ...formData };
    data.id = uuid.v4();

    bookings.push(data);

    localStorage.setItem('bookings', JSON.stringify(bookings));

    this.router.navigateByUrl('/admin/booking/list');
  }
}
