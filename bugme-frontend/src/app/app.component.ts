import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bugme-frontend';

  constructor(
    public router: Router
  ){ }

  public navigate(name: string){
    this.router.navigate(["/" + name]);
  }
}
