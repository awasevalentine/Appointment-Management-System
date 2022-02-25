import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewAppointmentDto } from 'src/app/Models/Interface/appointment.interface';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { CreateAppoinmetComponent } from '../../AppointmentPages/create-appoinmet/create-appoinmet.component';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.scss']
})
export class AddEditModalComponent implements OnInit {
//variables to hold the incoming data that will be sent from the runningAppointmentComponent Dialog
action!: string;
data!: any;

constructor( public _dialogRef: MatDialogRef<CreateAppoinmetComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) public _data: NewAppointmentDto,
  private _authService: AuthService,
  private _router: Router
  ) {
    console.log("this is on the dialog component -> ", this._data)
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


doAction(){
  this._dialogRef.close({
    event: this.action,
    data: this.data
  });
  console.log("dat -> ", this.data)
  return this.data
}


closeDialog(){
  this._dialogRef.close(true);
}

}
