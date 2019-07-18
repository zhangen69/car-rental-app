import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingViewBookingComponent } from './landing-view-booking.component';

describe('LandingViewBookingComponent', () => {
  let component: LandingViewBookingComponent;
  let fixture: ComponentFixture<LandingViewBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingViewBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingViewBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
