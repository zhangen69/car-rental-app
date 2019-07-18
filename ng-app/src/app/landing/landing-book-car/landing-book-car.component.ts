import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-landing-book-car',
  templateUrl: './landing-book-car.component.html',
  styleUrls: ['./landing-book-car.component.sass']
})
export class LandingBookCarComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LandingBookCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
