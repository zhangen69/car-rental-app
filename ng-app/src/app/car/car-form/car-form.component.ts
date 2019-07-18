import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.sass']
})
export class CarFormComponent implements OnInit {
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
    let cars = JSON.parse(localStorage.getItem('cars'));

    if (cars === null) {
      cars = [];
    }

    const data = {...formData};
    data.id = uuid.v4();

    cars.push(data);

    localStorage.setItem('cars', JSON.stringify(cars));

  }

}
