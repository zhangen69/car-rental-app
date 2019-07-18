import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import * as uuid from 'uuid';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.sass']
})
export class BookingFormComponent implements OnInit {
  formData = this.formBuilder.group({
    model: ['', Validators.required],
    brand: ['', Validators.required],
    carNumber: ['', Validators.required],
    color: ['', Validators.required],
    photo: ['', Validators.required],
    insurance: ['', Validators.required],
    roadTax: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
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

  }

}
