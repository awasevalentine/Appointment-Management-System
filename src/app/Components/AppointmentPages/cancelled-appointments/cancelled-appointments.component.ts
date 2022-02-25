import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppointmentDetails, appointmentResultData } from 'src/app/Models/Interface/appointment.interface';
import { ResponseNotification } from 'src/app/Models/Response/snackBar_response';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { AddEditModalComponent } from '../../Modals/add-edit-modal/add-edit-modal.component';
import { AppointmentDetailsComponent } from '../../Modals/appointment-details/appointment-details.component';
import { DeleteModalComponent } from '../../Modals/delete-modal/delete-modal.component';
import { EmailComponent } from '../../Modals/email/email.component';

@Component({
  selector: 'app-cancelled-appointments',
  templateUrl: './cancelled-appointments.component.html',
  styleUrls: ['./cancelled-appointments.component.scss']
})
export class CancelledAppointmentsComponent implements OnInit {
  title = 'pagination';
  appointmentData!: any[];
  loading: boolean = true;
  selectedName: any;
  displayedColumns: string[] = ['title', 'name', 'operation'];
  displayedColumns2: string[] = ['title','operation'];
  resultLength = 0;


  dataSource!: appointmentResultData
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) dataTable!: MatTable<any>;


  constructor(private http: HttpClient,
    private _responseMsg: ResponseNotification,
    private _dialogBox: MatDialog,
    private _appointmentService: AppointmentService,
    private _authService: AuthService,
    private _router: Router
    ) {

  }

/** Section for Angular Lifecycle hooks methods */
  ngOnInit() {
    this.initDataSource()
  }

  ngAfterViewInit() {
    this.initDataSource()

  }

  ngDoCheck(): void {
    this._authService.isLoggedInUser()
    if(!this._authService.isLoggedInUser())
    {
         this._router.navigateByUrl('/dashboard/home');
    }
  }
/** End of Angular Lifecycle hooks methods */


  highlightRow(data: any){
    this.selectedName = data.name
  }



  initDataSource() {
    this._appointmentService.getAllCancelledAppointment(0, 5).pipe(
      map((appointmentData: appointmentResultData) => {
        this.dataSource = appointmentData
        this.resultLength = appointmentData.totalCount
      }
      )
    ).subscribe();
  }

  /**
   * section for editing and deleting appointments
   */
   openDialogBox(action: string, obj: any){
     obj.action = action;
     let dialogRef;
     if(action === 'Delete'){
       dialogRef = this._dialogBox.open(DeleteModalComponent, {
        width: '500px',
        height: '300px',
        data: obj
      }).afterClosed().subscribe(
        (result)=>{
          this.initDataSource()
        }
      )
     }
     else if(action === 'Details'){
      dialogRef = this._dialogBox.open(AppointmentDetailsComponent, {
       width: '600px',
       height: '600px',
       data: obj
     }).afterClosed().subscribe(
       (result)=>{
        //  this.getData(1,5)
       }
     )
    }
    else if(action ==='Email'){
      dialogRef = this._dialogBox.open(EmailComponent, {
       width: '600px',
       height: '600px',
       data: obj
     }).afterClosed().subscribe(
       (result)=>{
        //  this.getData(1,5)
       }
     )
    }
    // background-color: aquamarine;
    if(action ==='Update'){
      dialogRef = this._dialogBox.open(AddEditModalComponent, {
       width: '800px',
       height: '550px',
       data: obj
     }).afterClosed().subscribe(
       (res) =>{
         if(res.response === true){
           this.initDataSource()
         }
       }
     )
    }
  }

  /*
   *End
   */

  onPageChanged(event: PageEvent) {
    let offset = event.pageIndex;
    let limit = event.pageSize;

    this._appointmentService.getAllCancelledAppointment(offset,limit).pipe(
      map((appointmentDataResult: appointmentResultData) => {
        this.dataSource = appointmentDataResult;
      })
    ).subscribe()
  }
}
