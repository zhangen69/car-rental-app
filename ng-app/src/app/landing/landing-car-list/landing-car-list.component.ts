import { MatSnackBar } from '@angular/material/snack-bar';
import { LandingBookCarComponent } from './../landing-book-car/landing-book-car.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-landing-car-list',
  templateUrl: './landing-car-list.component.html',
  styleUrls: ['./landing-car-list.component.sass']
})
export class LandingCarListComponent implements OnInit {
  cols = 4;
  smallSize = false;
  cars = JSON.parse(localStorage.getItem('cars'));
  constructor(private dialog: MatDialog, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.onResize();
  }

  onBookCar(car) {
    const dialogRef = this.dialog.open(LandingBookCarComponent, {
      width: 'auto',
      minWidth: '50vw',
      maxHeight: '99vh',
      data: car
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.success) {
        this.snackbar.open('Booked car successfully!');
      }
    });
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
