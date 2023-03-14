import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-web-banner',
  templateUrl: './web-banner.component.html',
  styleUrls: ['./web-banner.component.scss']
})
export class WebBannerComponent {
  constructor(
    private appComponent: AppComponent
  ) { }

  //gamesInCart: Array<any>; 
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
