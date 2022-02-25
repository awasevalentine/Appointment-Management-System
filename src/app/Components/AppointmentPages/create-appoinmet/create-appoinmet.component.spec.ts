import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppoinmetComponent } from './create-appoinmet.component';

describe('CreateAppoinmetComponent', () => {
  let component: CreateAppoinmetComponent;
  let fixture: ComponentFixture<CreateAppoinmetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAppoinmetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAppoinmetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
