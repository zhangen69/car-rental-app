import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as uuid from 'uuid';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.sass']
})
export class CustomerFormComponent implements OnInit {
  formData = this.formBuilder.group({
    id: null,
    name: ['', Validators.required],
    contact: ['', Validators.required],
    identityCode: ['', Validators.required],
    remarks: '',
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        const list = JSON.parse(localStorage.getItem('customers'));
        const data = list.find((item) => item.id === params.id);
        this.formData.patchValue(data);
      }
    });
  }

  onSubmit(formData) {
    let list = JSON.parse(localStorage.getItem('customers'));

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

    localStorage.setItem('customers', JSON.stringify(list));
    this.router.navigateByUrl('/admin/customer/list');
  }
}
