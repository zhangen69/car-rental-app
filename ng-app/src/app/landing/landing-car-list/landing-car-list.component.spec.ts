import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingCarListComponent } from './landing-car-list.component';

describe('LandingCarListComponent', () => {
  let component: LandingCarListComponent;
  let fixture: ComponentFixture<LandingCarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingCarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingCarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
