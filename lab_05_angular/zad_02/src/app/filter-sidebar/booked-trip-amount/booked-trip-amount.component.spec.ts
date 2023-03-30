import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedTripAmountComponent } from './booked-trip-amount.component';

describe('BookedTripAmountComponent', () => {
  let component: BookedTripAmountComponent;
  let fixture: ComponentFixture<BookedTripAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedTripAmountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookedTripAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
