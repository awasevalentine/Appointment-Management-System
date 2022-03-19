import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { Form } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AppointmentDetails, NewAppointmentDto } from 'src/app/Models/Interface/appointment.interface';
import { AppointmentStatus } from 'src/app/Models/Interface/appointment_status.enum';
import { ResponseNotification } from 'src/app/Models/Response/snackBar_response';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-create-appoinmet',
  templateUrl: './create-appoinmet.component.html',
  styleUrls: ['./create-appoinmet.component.scss']
})
export class CreateAppoinmetComponent implements OnInit {
  today = new Date()
  createAppointmentForm!: Form
  appointmentDetails!:NewAppointmentDto;
  isUpdated:boolean =false;
  isCreatingAppointment: boolean = false;

  @Input()title!: any;
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
      userAuthId: '',
      appointment_email: ''
    }
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this._authService.isLoggedInUser()
    if(!this._authService.isLoggedInUser())
    {
         this._router.navigateByUrl('/dashboard/home');
    }
  }


  // Method to append AM/PM to the time
   onTimeChange(data: any) {
    var timeSplit = data.split(':'),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }
    return hours + ':' + minutes + ' ' + meridian
  }



  create(){
    this.isCreatingAppointment = true
    this.appointmentDetails.userAuthId = this._authService.getUserId();
    this.appointmentDetails.status = AppointmentStatus.RUNNING
    this.appointmentDetails.appointment_time = this.onTimeChange(this.appointmentDetails.appointment_time)
    return this._appointmentService.createAppointment(this.appointmentDetails).subscribe(
      (data) =>{
        if(data){
           this._responseMsg.Response('Appointment Created successfully!');
           this._router.navigateByUrl('dashboard/home');
           this.isCreatingAppointment = false
        }
      },
      (err) =>{
        this._responseMsg.Response(err.message);
        this.isCreatingAppointment = false
      }

    );
  }


  updateAppointment(){
    // this.appointmentDetails = this.appointmentData
    let id = this.appointmentData.appointment_id
    this.appointmentDetails.userAuthId = this.appointmentData.userDetails.auth_id
    this.appointmentDetails.title = this.appointmentData.title;
    this.appointmentDetails.name = this.appointmentData.name;
    this.appointmentDetails.appointment_description = this.appointmentData.appointment_description;
    this.appointmentDetails.status = AppointmentStatus.RUNNING;
    this.appointmentDetails.appointment_email = this.appointmentData.appointment_email;
    this.appointmentDetails.appointment_date = this.appointmentData.appointment_date;
    this.appointmentDetails.appointment_time = this.appointmentData.appointment_time;
    this.appointmentDetails.appointment_time = this.onTimeChange(this.appointmentData.appointment_time)
    return this._appointmentService.updateAppointment(id, this.appointmentDetails).subscribe(
      (response) =>{
       this._responseMsg.Response(response.data)
      //  return this.isUpdated = true;
       this._dialogRef.close({response: this.isUpdated = true});
      },
      (error) =>{
       this._responseMsg.Response(error.data)
      }
    )
  }


  //Sending Email
  sendEmail(){
    console.log("Sent!")
  }


  closeDialog(){
    this._dialogRef.close({event: 'Cancel'});
  }

}
