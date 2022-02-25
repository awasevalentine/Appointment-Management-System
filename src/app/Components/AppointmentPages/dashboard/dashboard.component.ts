import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  openSidenav!:boolean;
  private screenWidth$ = new BehaviorSubject<number> (window.innerWidth);

  @ViewChild('sidenav') matSidenav!: MatSidenav;

  loggedInUser: any = {};
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  message: string;
  menuItems!: any[];
  events: String[] = [];
  opened!: boolean;


  constructor(
              changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              private router: Router,
              private _authService: AuthService
  ) {
    this.message = "";
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  //Method for closing sidebar
  close(){
    this.openSidenav = false
  }

  ngOnInit(): void {

    this.getScreenWidth().subscribe(width => {
      if (width < 640) {
       this.openSidenav = false;
     }
     else if (width > 640) {
       this.openSidenav = true;
     }
   });
  }

  ngDoCheck(): void {
    this._authService.isLoggedInUser()
    if(!this._authService.isLoggedInUser())
    {
         this.router.navigateByUrl('/dashboard/home');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.screenWidth$.next(event.target.innerWidth);
  }
  getScreenWidth(): Observable<number> {
    return this.screenWidth$.asObservable();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
