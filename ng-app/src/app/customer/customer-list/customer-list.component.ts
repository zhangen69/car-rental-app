import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.sass']
})
export class CustomerListComponent implements OnInit {
  displayedColumns = ['name', 'contact', 'identityCode', 'action'];
  dataSource = JSON.parse(localStorage.getItem('customers'));

  constructor() { }

  ngOnInit() {
  }

}
