import { Component, OnInit, ViewChild } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { AOSAnimation } from 'src/app/Models/Interface/animation';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  rowHeight=""
  columns!: number;
  constructor(private _authService: AuthService, private _mediaObserver: MediaObserver) { }

  ngOnInit(): void {
    AOSAnimation();
    // this.breakPoints();
  }

  // onresize(event:any){
  //   // this.breakPoints();
  // }

  ngAfterContentInit(): void {
    this.mediaQuery();
  }

  //For changing the grid list column based on device type or viewport
  // breakPoints() {
  //   switch(true) {
  //       case (window.innerWidth <= 480):
  //         this.columns = 1;
  //         break;
  //       case (window.innerWidth > 480 && window.innerWidth <= 640):
  //         this.columns = 2;
  //         break;
  //       case (window.innerWidth > 640 && window.innerWidth <= 992):
  //         this.columns = 3;
  //         break;
  //       default:
  //         this.columns = 5;
  //     }
  //   }


  mediaQuery(){
    this._mediaObserver.asObservable()
    .subscribe((change) => {
      change.forEach((item) => {
        if (item.mqAlias === 'xs') {
          this.rowHeight = "2:4"
          this.columns = 1
        }
        if (item.mqAlias === 'sm') {
          this.rowHeight = "2:4"
          this.columns = 1
        }
        if (item.mqAlias === 'md') {
          this.rowHeight = "2:3"
          this.columns = 2
        }
        if (item.mqAlias === 'lg') {
          this.rowHeight = "2:2.5"
          this.columns = 2
        }
        if (item.mqAlias === 'xl') {
          this.rowHeight = "2:2.5"
          this.columns = 4
        }
      });
    });
  }

  loginPage(){
     this._authService.userLogin()
  }

}
