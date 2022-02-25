import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppointmentDetails, NewAppointmentDto } from 'src/app/Models/Interface/appointment.interface';
import { AppointmentStatus } from 'src/app/Models/Interface/appointment_status.enum';
import { ResponseNotification } from 'src/app/Models/Response/snackBar_response';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { CreateAppoinmetComponent } from '../../AppointmentPages/create-appoinmet/create-appoinmet.component';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
    //variables to hold the incoming data that will be sent from the runningAppointmentComponent Dialog
    action!: string;
    data!: any;

    constructor( public _dialogRef: MatDialogRef<CreateAppoinmetComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public _data: AppointmentDetails,
      public _responseMsg: ResponseNotification,
      private _appointmentService: AppointmentService,
      private _authService: AuthService,
      private _router: Router
      ) {
        this.data = {...this._data};
        this.action = this.data.action;
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


  /**
   * Method for deleting a particular appointment
   */
      deleteAppointment(){
        let appointmentId = this.data.appointment_id
        return this._appointmentService.deleteAppointment(appointmentId).subscribe(
          (response) =>{
          this._responseMsg.Response(response.message);
          this._dialogRef.close(true);
          },
          (error) =>{
          this._responseMsg.Response(error.message)
          }
        )
    }


      /**
   * Method for deleting a particular appointment
   */
       cancelAppointment(){
        let appointmentId = this.data.appointment_id
        return this._appointmentService.cancelAppointment(appointmentId, AppointmentStatus.CANCEL).subscribe(
          (response) =>{
          this._responseMsg.Response(response.message);
          this._dialogRef.close();
          },
          (error) =>{
          this._responseMsg.Response(error.message)
          }
        )
    }




  // This is method is used to cancel the dialog box, should incase you dont want to perform any operation on it
    closeDialog(){
      this._dialogRef.close({event: 'Cancel'});
    }

}
