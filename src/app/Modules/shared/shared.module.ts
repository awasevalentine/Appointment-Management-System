import { MobileHeaderComponent } from './../../Components/Shared/mobile-header/mobile-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from 'src/app/Components/Shared/default/default.component';
import { FooterComponent } from 'src/app/Components/Shared/footer/footer.component';
import { HeaderComponent } from 'src/app/Components/Shared/header/header.component';
import { SharedService } from 'src/app/Services/shared.service';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { RouterModule, Routes } from '@angular/router';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { LoginComponent } from 'src/app/Components/Auth/Login/login.component';
import { RegisterComponent } from 'src/app/Components/Auth/Register/register.component';


const authRoutes = RouterModule.forChild([
  {
    path: '',
    component: DefaultComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
]);

@NgModule({
  declarations: [
    DefaultComponent, FooterComponent,
    HeaderComponent, MobileHeaderComponent
  ],
  imports: [
    CommonModule, AngularMaterialModule,
    authRoutes, MatCarouselModule.forRoot()
  ],
  providers: [SharedService],
  exports: [DefaultComponent, FooterComponent, HeaderComponent, MobileHeaderComponent]
})
export class SharedModule { }
