import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-web-banner',
  templateUrl: './web-banner.component.html',
  styleUrls: ['./web-banner.component.scss'],
})
export class WebBannerComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  constructor(private appComponent: AppComponent) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    const cartItems = JSON.parse(
      localStorage.getItem('productsInCart') || '[]'
    );

    this.cartSize = cartItems.length;
    setTimeout(() => {
      this.checkBug33();
    }, 100);
  }

  currentUser: any = {};

  cartSize: number = 0;

  bug33: boolean = false;

  navigateStore() {
    let bug: Array<any> = JSON.parse(localStorage.getItem('responseArray')!);

    if (bug[12] == null || bug[12] == false) {
      this.appComponent.navigate('/landing');
    } else if (bug[12] == true) {
      this.appComponent.navigate('/?');
    }
  }

  checkBug33(){
    let bug: Array<any> = JSON.parse(localStorage.getItem('responseArray')!);

    if (bug[10] == null || bug[10] == false) {
      this.bug33 = false;
    } else if (bug[10] == true) {
      this.bug33 = true;
    }
  }

  routeToCart() {
    let bug: Array<any> = JSON.parse(localStorage.getItem('responseArray')!);

    if (bug[9] == null && bug[14] == null) {
      this.appComponent.navigate('/checkout');
    } else if (bug[9] == true) {
      this.appComponent.navigate('/checkoutLoading');
    } else if (bug[14] == true) {
      this.appComponent.navigate('/checkoutLoad');
    } else {
      this.appComponent.navigate('/checkout');
    }
  }

  navigateLogin() {
    localStorage.clear();
    this.appComponent.navigate('');
  }

  navigateTeacher() {
    this.appComponent.navigate('/teacher');
  }

  navigateEmployee() {
    let bug: Array<any> = JSON.parse(localStorage.getItem('responseArray')!);

    if (bug[13] == null || bug[13] == false) {
      this.appComponent.navigate('/employee');
    } else if (bug[13] == true) {
      this.appComponent.navigate('/badGateway');
    }
  }
}
