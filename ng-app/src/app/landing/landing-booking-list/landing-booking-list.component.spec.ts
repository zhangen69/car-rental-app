import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingBookingListComponent } from './landing-booking-list.component';

describe('LandingBookingListComponent', () => {
  let component: LandingBookingListComponent;
  let fixture: ComponentFixture<LandingBookingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingBookingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
