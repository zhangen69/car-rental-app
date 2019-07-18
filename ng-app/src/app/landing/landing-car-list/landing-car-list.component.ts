import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-car-list',
  templateUrl: './landing-car-list.component.html',
  styleUrls: ['./landing-car-list.component.sass']
})
export class LandingCarListComponent implements OnInit {
  cols = 4;
  smallSize = false;
  cars = JSON.parse(localStorage.getItem('cars'));
  constructor() { }

  ngOnInit() {
    this.onResize();
  }

  onResize() {
    if (window.innerWidth <= 425) {
      this.cols = 1;
      this.smallSize = true;
    } else if (window.innerWidth <= 768) {
      this.cols = 2;
      this.smallSize = true;
    } else if (window.innerWidth <= 1024) {
      this.cols = 3;
      this.smallSize = false;
    } else {
      this.cols = 4;
      this.smallSize = false;
    }
  }

}
