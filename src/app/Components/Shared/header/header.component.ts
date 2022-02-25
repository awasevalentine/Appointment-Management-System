import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { AOSAnimation } from 'src/app/Models/Interface/animation';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  menuToggle: boolean = false

  loginStatus: boolean = false

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    //For animation
    AOSAnimation();
    
    this.isLoggedInUser()
  }

  ngDoCheck(): void {
    this.isLoggedInUser()
 }

  // when this is true, the login/signup element on the header changes to person icon
  isLoggedInUser(){
    if(this._authService.isAuthenticated()){
      return this.loginStatus = true;
    }else {
      return this.loginStatus = false
    }
  }

  // when this is true, the the person icon changes to Login/sign up
  logoutUser(){
    this._authService.logOutUser();
  }

  openUserMenu(){
      return this.trigger.openMenu()
    }

    closeUserMenu(){
      return this.trigger.closeMenu()
    }

}
