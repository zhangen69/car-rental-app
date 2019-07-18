import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.sass']
})
export class BookingListComponent implements OnInit {
  displayedColumns = ['dateFrom', 'dateTo', 'car', 'customer', 'action'];
  dataSource = JSON.parse(localStorage.getItem('bookings'));

  constructor() { }

  ngOnInit() {
  }

}
