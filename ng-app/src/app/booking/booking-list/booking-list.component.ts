import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.sass']
})
export class BookingListComponent implements OnInit {
  bookings = JSON.parse(localStorage.getItem('bookings'));

  constructor() { }

  ngOnInit() {
  }

}
