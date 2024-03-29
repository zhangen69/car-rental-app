import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.sass']
})
export class CarListComponent implements OnInit {
  displayedColumns = ['brand', 'model', 'carNumber', 'color', 'action'];
  dataSource = JSON.parse(localStorage.getItem('cars'));
  constructor() { }

  ngOnInit() {
  }

}
