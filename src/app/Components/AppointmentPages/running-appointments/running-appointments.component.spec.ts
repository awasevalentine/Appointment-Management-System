import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningAppointmentsComponent } from './running-appointments.component';

describe('RunningAppointmentsComponent', () => {
  let component: RunningAppointmentsComponent;
  let fixture: ComponentFixture<RunningAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunningAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
