import { TotalCount } from './totalcount.interface';
import { AppointmentStatus } from "./appointment_status.enum";


export interface NewAppointmentDto{
    title: string;
    appointment_description: string;
    name: string;
    appointment_date: Date | string;
    appointment_time: any;
    status?: AppointmentStatus
    userAuthId: string;
    appointment_email?: string

}

export interface AppointmentDetails {
  userAuthId: string;
  appointment_id: string
  title: string;
  appointment_description: string;
  name: string;
  status?: AppointmentStatus
  appointment_date: Date | string;
  appointment_email?: string
  appointment_time: any;
  created_date?: Date;
  updated_date?: Date;
  userDetails: {
      auth_id: string,
      account_type: string;
      email: string;
      fullName: string
  }
}

export interface appointmentResultData{
  data: AppointmentDetails[];
  totalCount: number;
  limit: number;
  page: number
}

// export interface AppointmentResultDetails{
//   items: AppointmentData[];
//   meta: {
//     totalItems: number;
//     itemCount: number;
//     itemsPerPage: number;
//     totalPages: number;
//     currentPage: number;
//   },
//   links: {
//     first: string;
//     previous: string;
//     next: string;
//     last: string;
//   }
// }


export interface AppointmentData {
  userAuthId: string;
  appointment_id: string
  title: string;
  appointment_description: string;
  name: string;
  status?: AppointmentStatus
  appointment_date: Date | string;
  appointment_time: any;
  created_date?: Date;
  updated_date?: Date;
  userDetails: {
      auth_id: string,
      account_type: string;
      email: string;
      fullName: string
  }
}
