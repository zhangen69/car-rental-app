import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingViewCarComponent } from './landing-view-car.component';

describe('LandingViewCarComponent', () => {
  let component: LandingViewCarComponent;
  let fixture: ComponentFixture<LandingViewCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingViewCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingViewCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
