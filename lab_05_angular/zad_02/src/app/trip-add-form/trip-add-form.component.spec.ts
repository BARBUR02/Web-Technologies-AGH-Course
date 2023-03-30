import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripAddFormComponent } from './trip-add-form.component';

describe('TripAddFormComponent', () => {
  let component: TripAddFormComponent;
  let fixture: ComponentFixture<TripAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripAddFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
