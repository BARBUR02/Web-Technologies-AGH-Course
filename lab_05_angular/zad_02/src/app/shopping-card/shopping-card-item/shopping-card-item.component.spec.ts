import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCardItemComponent } from './shopping-card-item.component';

describe('ShoppingCardItemComponent', () => {
  let component: ShoppingCardItemComponent;
  let fixture: ComponentFixture<ShoppingCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
