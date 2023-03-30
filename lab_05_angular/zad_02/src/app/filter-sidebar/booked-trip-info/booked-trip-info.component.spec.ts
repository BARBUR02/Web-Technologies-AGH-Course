import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedTripInfoComponent } from './booked-trip-info.component';

describe('BookedTripInfoComponent', () => {
  let component: BookedTripInfoComponent;
  let fixture: ComponentFixture<BookedTripInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedTripInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookedTripInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
