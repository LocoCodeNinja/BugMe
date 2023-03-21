import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import {MatBadgeModule} from '@angular/material/badge';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-web-banner',
  templateUrl: './web-banner.component.html',
  styleUrls: ['./web-banner.component.scss']
})
export class WebBannerComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  constructor(
    private appComponent: AppComponent
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")!);
  }

  currentUser: any = {};

  cartSize: number = 0;

  navigateStore(){
    this.appComponent.navigate("/landing");
  }
  
  routeToCart(){
    this.appComponent.navigate("/checkout");
  }

  navigateLogin(){
    localStorage.clear();
    this.appComponent.navigate("");
  }

  navigateTeacher(){
    this.appComponent.navigate("/teacher");
  }
}
