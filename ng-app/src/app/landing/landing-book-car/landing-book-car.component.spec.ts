import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingBookCarComponent } from './landing-book-car.component';

describe('LandingBookCarComponent', () => {
  let component: LandingBookCarComponent;
  let fixture: ComponentFixture<LandingBookCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingBookCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingBookCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
