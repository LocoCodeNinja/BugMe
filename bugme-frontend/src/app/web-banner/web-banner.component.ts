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
    this.appComponent.navigate("store");
  }
  
  routeToCart(){
    this.appComponent.navigate("/checkout");
  }

  navigateLogin(){
    localStorage.clear();
    this.appComponent.navigate("");
  }

  navigateSocial(){
    this.appComponent.navigate("social");
  }

  navigatePreferences(){
    this.appComponent.navigate("preferences");
  }

  navigateProfile(){
    this.appComponent.navigate("profile");
  }
}
