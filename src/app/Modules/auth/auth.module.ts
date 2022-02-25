import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { LoginComponent } from 'src/app/Components/Auth/Login/login.component';
import { RegisterComponent } from 'src/app/Components/Auth/Register/register.component';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ResponseNotification } from 'src/app/Models/Response/snackBar_response';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,RouterModule,
    AngularMaterialModule,HttpClientModule
  ],
  providers: [AuthService, ResponseNotification]
})
export class AuthModule { }
