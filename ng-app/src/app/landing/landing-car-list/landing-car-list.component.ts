import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-car-list',
  templateUrl: './landing-car-list.component.html',
  styleUrls: ['./landing-car-list.component.sass']
})
export class LandingCarListComponent implements OnInit {
  cols = 4;
  constructor() { }

  ngOnInit() {
    this.onResize();
  }

  onResize() {
    if (window.innerWidth <= 425) {
      this.cols = 1;
    } else if (window.innerWidth <= 768) {
      this.cols = 2;
    } else if (window.innerWidth <= 1024) {
      this.cols = 3;
    } else {
      this.cols = 4;
    }
  }

}
