import {  map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { appointmentResultData } from 'src/app/Models/Interface/appointment.interface';
import { ResponseNotification } from 'src/app/Models/Response/snackBar_response';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { AddEditModalComponent } from '../../Modals/add-edit-modal/add-edit-modal.component';
import { AppointmentDetailsComponent } from '../../Modals/appointment-details/appointment-details.component';
import { DeleteModalComponent } from '../../Modals/delete-modal/delete-modal.component';
import { EmailComponent } from '../../Modals/email/email.component';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { AppointmentStatus } from 'src/app/Models/Interface/appointment_status.enum';


@Component({
  selector: 'app-running-appointments',
  templateUrl: './running-appointments.component.html',
  styleUrls: ['./running-appointments.component.scss'],
})
export class RunningAppointmentsComponent implements OnInit {
  totalCounts: any = [];
  appointmentData!: any[];
  loading: boolean = true;
  selectedName: any;
  resultLength = 0;

  // displayedColumns: string[] = ['name', 'title', 'appointment_description', 'appointment_date', 'appointment_time', 'operation'];
  displayedColumns: string[] = ['title', 'name', 'operation'];
  displayedColumns2: string[] = ['title', 'operation'];

  dataSource!: appointmentResultData
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) dataTable!: MatTable<any>;


  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ["Running", "Complete", "Cancelled"];
  barChartType: ChartType = 'bar';
  barChartLegend = true;

 public barChartColors: Color[] = [

 { backgroundColor: ['yellow', 'green', "red"], hoverBackgroundColor: '"#FFCE56"' },
]

  barChartData: ChartDataSets[] = [
    // { data: [this.totalCount.running, this.totalCount.cancelled, this.totalCount.completed], label: 'Task Status' }
  ];

  constructor(private http: HttpClient,
    private _responseMsg: ResponseNotification,
    private _dialogBox: MatDialog,
    private _appointmentService: AppointmentService,
    private _authService: AuthService,
    private _router: Router,
    public _http: HttpClient,
    ) {

  }

/** Section for Angular Lifecycle hooks methods */
  ngOnInit() {
    this.initDataSource()
    this.getTotalCount();
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



  initDataSource() {
    this._appointmentService.getAllRunningAppointment(0, 5).pipe(
      map((appointmentData: appointmentResultData) => {
        this.dataSource = appointmentData
        this.resultLength = appointmentData.totalCount
      }
      )
    ).subscribe();
  }


  highlightRow(data: any){
    this.selectedName = data.name
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
          if(result === true){
          this.dataSource.data = this.dataSource.data.filter((value:any)=>{
            return value.appointment_id != obj.appointment_id
          })
          this.initDataSource();
        }
        }
      )
     }
     else if(action === 'Details'){
      dialogRef = this._dialogBox.open(AppointmentDetailsComponent, {
       width: '600px',
       height: '500px',
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


  //Section for updating the DB and the matTable if the mark as complete button is clicked
  completedCheckBox(data: any){
    let appointmentId = data.appointment_id
     this._appointmentService.markAsCompleteAppointment(appointmentId, AppointmentStatus.COMPLETED).subscribe(
      (response) =>{
        if(response){
          this.dataSource.data = this.dataSource.data.filter((value:any)=>{
            return value.appointment_id != data.appointment_id
          })
        }
      this._responseMsg.Response(response.responseDescription);
      this.initDataSource()
      },
      (error) =>{
      this._responseMsg.Response(error.data)
      }
    );
  }
  /*
   *End
   */


   //For getting total counts
   getTotalCount(){
     const userId = this._authService.getUserId();
     this._appointmentService.getAppointmentsTotalCount(userId).subscribe(
       (result: any)=>{
        this.totalCounts.push(result.data)
      },
      (error) =>{
        throw new Error(error)
      }
     );
   }




  onPageChanged(event: PageEvent) {
    let offset = event.pageIndex;
    let limit = event.pageSize;

    this._appointmentService.getAllRunningAppointment(offset,limit).pipe(
      map((appointmentDataResult: appointmentResultData) => {
        this.dataSource = appointmentDataResult;
      })
    ).subscribe()
  }

}
