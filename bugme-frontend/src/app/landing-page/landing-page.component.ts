import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import axios, { AxiosResponse } from 'axios';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  constructor(private router: Router, private appComponent: AppComponent) {}

  searchQuery: string = '';
  filteredProducts!: any[];
  searchPerformed: boolean = false;

  async ngOnInit() {
    await this.getProducts();
  }

  sortCtrl: FormControl = new FormControl(null);

  productArray: Array<any> = [];

  async getProducts() {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/products/all'
      );

      this.productArray = response.data;
    } catch (error) {
      console.log(error);
    }
  }

  search() {
    if (this.searchQuery.trim().length > 0) {
      this.searchPerformed = true;
      this.filteredProducts = this.productArray.filter((item) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.searchPerformed = false;
    }
  }

  saveItem(item: any) {
    localStorage.setItem('selectedProduct', JSON.stringify(item));
    this.appComponent.navigate('/product');
  }
}
