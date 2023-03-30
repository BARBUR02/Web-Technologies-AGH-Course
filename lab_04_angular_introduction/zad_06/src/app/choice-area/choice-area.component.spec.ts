import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceAreaComponent } from './choice-area.component';

describe('ChoiceAreaComponent', () => {
  let component: ChoiceAreaComponent;
  let fixture: ComponentFixture<ChoiceAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoiceAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoiceAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
