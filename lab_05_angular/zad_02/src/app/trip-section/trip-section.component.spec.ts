import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripSectionComponent } from './trip-section.component';

describe('TripSectionComponent', () => {
  let component: TripSectionComponent;
  let fixture: ComponentFixture<TripSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
