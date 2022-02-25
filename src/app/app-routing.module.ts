import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentModule } from './Modules/appointment/appointment.module';
import { SharedModule } from './Modules/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    // loadChildren: 'src/app/Modules/shared/shared.module#SharedModule'
    // loadChildren: ()=> import('./Modules/shared/shared.module').then(m => m.SharedModule)
    loadChildren: ()=> SharedModule
  },
  {
    path: 'dashboard',
    loadChildren: ()=> AppointmentModule
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
