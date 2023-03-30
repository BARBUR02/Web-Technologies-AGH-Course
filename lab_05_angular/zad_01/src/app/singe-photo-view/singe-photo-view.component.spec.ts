import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingePhotoViewComponent } from './singe-photo-view.component';

describe('SingePhotoViewComponent', () => {
  let component: SingePhotoViewComponent;
  let fixture: ComponentFixture<SingePhotoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingePhotoViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingePhotoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
