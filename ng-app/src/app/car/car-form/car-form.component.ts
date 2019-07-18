import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { filter, find, map, tap, mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.sass']
})
export class CarFormComponent implements OnInit {
  formData = this.formBuilder.group({
    id: null,
    model: ['', Validators.required],
    brand: ['', Validators.required],
    carNumber: ['', Validators.required],
    color: ['', Validators.required],
    photo: ['', Validators.required],
    insurance: ['', Validators.required],
    roadTax: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const cars = JSON.parse(localStorage.getItem('cars'));
      const car = cars.find((item) => item.id === params.id);
      this.formData.patchValue(car);
    });
  }

  onSubmit(formData) {
    let cars = JSON.parse(localStorage.getItem('cars'));

    if (cars === null) {
      cars = [];
    }

    const data = { ...formData };

    if (data.id) {
      // update
      const car = cars.find((item) => item.id === data.id);
      Object.keys(car).forEach(key => car[key] = data[key]);
    } else {
      // create
      data.id = uuid.v4();
      cars.push(data);
    }

    localStorage.setItem('cars', JSON.stringify(cars));
    this.router.navigateByUrl('/admin/car/list');
  }

}
