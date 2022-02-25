import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { Form } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { NewAppointmentDto, AppointmentDetails } from 'src/app/Models/Interface/appointment.interface';
import { ResponseNotification } from 'src/app/Models/Response/snackBar_response';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  today = new Date()
  createAppointmentForm!: Form
  appointmentDetails!:NewAppointmentDto;
  isUpdated:boolean =false;

  @Input()appointmentData!:AppointmentDetails;
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  constructor( private _ngZone: NgZone,
    public _dialogRef: MatDialogRef<any>,
    private _router: Router,
    private _appointmentService: AppointmentService,
    public _responseMsg: ResponseNotification,
    private _authService: AuthService
     ) {
    this.appointmentDetails ={
      title: '',
      name: '',
      appointment_description: '',
      appointment_date: new Date(),
      appointment_time: '',
      userAuthId: ''
    }
  }

  ngOnInit(): void {
  }

    //Sending Email
    sendEmail(){
      console.log("Sent!")
    }
  
  
    closeDialog(){
      this._dialogRef.close({event: 'Cancel'});
    }

}
