import { map, catchError } from 'rxjs/operators';
// import { AppointmentDetails } from 'src/app/Models/Interface/appointment.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppointmentDetails, appointmentResultData, NewAppointmentDto } from '../Models/Interface/appointment.interface';
import { AuthService } from './Auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = environment.baseUrl;
  private headers: HttpHeaders;
  constructor(private _http: HttpClient, private _authService: AuthService) {
    this.headers = new HttpHeaders().set("Authorization", "Bearer " + this._authService.getTokenFromLocalStorage());
  }


   createAppointment(data:NewAppointmentDto): Observable<any>{
     return this._http.post<any>(`${this.baseUrl}/create`, data, {headers: this.headers})
  }

  //Section for fetching all running appointments
   getAllRunningAppointment(offset: number, limit: number): Observable<appointmentResultData>{
    let params = new HttpParams();
    params = params.set('page', offset);
    params = params.set('limit', limit);
    params = params.set('userId', this._authService.getUserId())
    console.log("Params -> ", params)

     return this._http.get<appointmentResultData>(`${this.baseUrl}/all-running/appointments?` + params, {headers: this.headers})
     .pipe(
      map((appointmentDataResult: appointmentResultData) => appointmentDataResult),
      catchError(err => throwError(err))
    )
  }


//Section for fetching all Cancelled Appointments
  getAllCancelledAppointment(offset: number, limit: number): Observable<appointmentResultData>{
    let params = new HttpParams();
    params = params.set('page', offset);
    params = params.set('limit', limit);
    params = params.set('userId', this._authService.getUserId())
     return this._http.get<appointmentResultData>(`${this.baseUrl}/all-cancelled/appointments?` + params, {headers: this.headers}).
     pipe(
       map((response: appointmentResultData) => response),
      catchError(err => throwError(err))
     )
  }


  //Section for fetching all Completed Appointments
  getAllCompletedAppointment(offset: number, limit: number): Observable<appointmentResultData>{
    let params = new HttpParams();
    params = params.set('page', offset);
    params = params.set('limit', limit);
    params = params.set('userId', this._authService.getUserId())
     return this._http.get<appointmentResultData>(`${this.baseUrl}/all-completed/appointments?` + params, {headers: this.headers})
     .pipe(
       map((response: appointmentResultData) => response),
       catchError(err => throwError(err))
     )
  }

  // Section for getting all running,cancelled,and completed appointments individual counts
  getAppointmentsTotalCount(userId: any): Observable<any>{
     return this._http.get<any>(`${this.baseUrl}/total_counts/${userId}`, {headers: this.headers})
  }



  //  getAppointmentById(id:string): Observable<AppointmentDetails>{
  //   return this._http.get<AppointmentDetails>(`${this.baseUrl}/get-appointment/${id}`)
  // }

  // getAllPointmentByUser(userId: string): Observable<AppointmentDetails[]>{
  //    return this._http.get<AppointmentDetails[]>(`${this.baseUrl}/get-allAppointmentByUser/${userId}`)
  // }

  //Section for deleting appointments permanently from the database
   deleteAppointment(id: string): Observable<any>{
    return this._http.delete(`${this.baseUrl}/delete/${id}`, {headers: this.headers})
  }

//section for cancelling appointment by changing the appointment status on the database
  cancelAppointment(id: string,  data: any): Observable<any>{
    return this._http.put<any>(`${this.baseUrl}/cancel/${id}`, data, {headers: this.headers})
  }


  //section for Marking appointment as complete appointment by changing the appointment status on the database
  markAsCompleteAppointment(id: string,  data: any): Observable<any>{
    return this._http.put<any>(`${this.baseUrl}/markcomplete/${id}`, data, {headers: this.headers})
  }


  //Section for updating appointments
   updateAppointment(id: string, data: any): Observable<any>{
     console.log("ID -> ", id)
    return this._http.put<any>(`${this.baseUrl}/update_appointment/${id}`, data,{headers: this.headers})
  }


}
