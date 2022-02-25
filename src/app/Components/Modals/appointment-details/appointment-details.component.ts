import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppointmentDetails } from 'src/app/Models/Interface/appointment.interface';
import { ResponseNotification } from 'src/app/Models/Response/snackBar_response';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { CreateAppoinmetComponent } from '../../AppointmentPages/create-appoinmet/create-appoinmet.component';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss']
})
export class AppointmentDetailsComponent implements OnInit {
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


   // This is method is used to cancel the dialog box, should incase you dont want to perform any operation on it
    closeDialog(){
      this._dialogRef.close({event: 'Close'});
    }
}
