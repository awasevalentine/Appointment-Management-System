import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/Components/AppointmentPages/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/Components/AppointmentPages/home/home.component';
import { RunningAppointmentsComponent } from 'src/app/Components/AppointmentPages/running-appointments/running-appointments.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CancelledAppointmentsComponent } from 'src/app/Components/AppointmentPages/cancelled-appointments/cancelled-appointments.component';
import { CreateAppoinmetComponent } from 'src/app/Components/AppointmentPages/create-appoinmet/create-appoinmet.component';
import { FormsModule } from '@angular/forms';
import { DeleteModalComponent } from 'src/app/Components/Modals/delete-modal/delete-modal.component';
import { AddEditModalComponent } from 'src/app/Components/Modals/add-edit-modal/add-edit-modal.component';
import { MatDialogRef } from '@angular/material/dialog';
import { LoggedInGuard } from 'src/app/Models/Gaurd/login_guard';
import { AppointmentDetailsComponent } from 'src/app/Components/Modals/appointment-details/appointment-details.component';
import { EmailComponent } from 'src/app/Components/Modals/email/email.component';
import { CompletedAppointmentsComponent } from 'src/app/Components/AppointmentPages/completed-appointments/completed-appointments.component';

const appointmentRoute = RouterModule.forChild([
  {
    path: '',
    component: DashboardComponent,
    children:[
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [LoggedInGuard]
      },
      {
        path: 'cancel/appointments',
        component: CancelledAppointmentsComponent,
        canActivate: [LoggedInGuard]
      },
      {
        path: 'new_apppointment',
        component: CreateAppoinmetComponent,
        canActivate: [LoggedInGuard]
      },
      {
        path: 'running_appointment',
        component: RunningAppointmentsComponent,
        canActivate: [LoggedInGuard]
      },
      {
        path: 'completed/appointments',
        component: CompletedAppointmentsComponent,
        canActivate: [LoggedInGuard]
      },
      
    ]
  },

])

@NgModule({
  declarations: [
    DashboardComponent, HomeComponent,
    RunningAppointmentsComponent,
    CancelledAppointmentsComponent,
    CreateAppoinmetComponent,
    DeleteModalComponent,
    AddEditModalComponent,
    AppointmentDetailsComponent,
    EmailComponent,
    CompletedAppointmentsComponent,
  ],
  imports: [
    CommonModule, appointmentRoute,
    AngularMaterialModule,
    FormsModule,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },

  ]
})
export class AppointmentModule { }
