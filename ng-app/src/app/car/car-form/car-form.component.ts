import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { Router, ActivatedRoute } from '@angular/router';

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
      if (params.id) {
        const list = JSON.parse(localStorage.getItem('cars'));
        const data = list.find((item) => item.id === params.id);
        this.formData.patchValue(data);
      }
    });
  }

  onSubmit(formData) {
    let list = JSON.parse(localStorage.getItem('cars'));

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

    localStorage.setItem('cars', JSON.stringify(list));
    this.router.navigateByUrl('/admin/car/list');
  }

}
