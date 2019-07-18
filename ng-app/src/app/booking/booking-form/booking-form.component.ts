import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import * as uuid from 'uuid';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.sass']
})
export class BookingFormComponent implements OnInit {
  now = moment().format('YYYY-MM-DD');
  formData = this.formBuilder.group({
    id: null,
    dateFrom: [this.now, Validators.required],
    dateTo: [this.now, Validators.required],
    car: ['', Validators.required],
    customer: ['', Validators.required],
    remarks: ['']
  });
  cars = JSON.parse(localStorage.getItem('cars')) || [];
  customers = JSON.parse(localStorage.getItem('customers')) || [];

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        const list = JSON.parse(localStorage.getItem('bookings'));
        const data = list.find((item) => item.id === params.id);
        this.formData.patchValue(data);
      }
    });
  }

  customerDisplayFn(data) {
    return data.name;
  }

  carDisplayFn(data) {
    return data.model;
  }

  onSubmit(formData) {
    let list = JSON.parse(localStorage.getItem('bookings'));

    if (list === null) {
      list = [];
    }

    const data = { ...formData };

    if (data.id) {
      // update
      const item = list.find((listItem) => listItem.id === data.id);
      Object.keys(data).forEach(key => item[key] = data[key]);
    } else {
      // create
      data.id = uuid.v4();
      list.push(data);
    }

    localStorage.setItem('bookings', JSON.stringify(list));
    this.router.navigateByUrl('/admin/booking/list');
  }
}
