import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './Modules/angular-material/angular-material.module';
import { AuthModule } from './Modules/auth/auth.module';
import { SharedModule } from './Modules/shared/shared.module';
import { AppointmentModule } from './Modules/appointment/appointment.module';
import { AppointmentDetailsComponent } from './Components/Modals/appointment-details/appointment-details.component';
import { EmailComponent } from './Components/Modals/email/email.component';
import { CompletedAppointmentsComponent } from './Components/AppointmentPages/completed-appointments/completed-appointments.component';
import { MobileHeaderComponent } from './Components/Shared/mobile-header/mobile-header.component';
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AuthModule,
    SharedModule,
    AppointmentModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
