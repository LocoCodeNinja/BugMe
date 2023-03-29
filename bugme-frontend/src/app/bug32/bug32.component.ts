import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-bug32',
  templateUrl: './bug32.component.html',
  styleUrls: ['./bug32.component.scss']
})
export class BUG32Component implements OnInit {
  constructor(private appComponent: AppComponent) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.appComponent.navigate('/checkout');
    }, 15000)
  }

}
