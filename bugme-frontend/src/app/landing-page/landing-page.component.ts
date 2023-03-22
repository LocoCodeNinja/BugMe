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
  category = { Tiny: false, Small: false, Medium: false, Large: false };
  //filteredProducts = [];
  selectedPriceRange: string = 'All';
  searchQuery: string = '';
  filteredProducts!: any[];
  searchPerformed: boolean = false;
  priceRanges: string[] = ['All', '$0-$10', '$10-$25', '$25-$50', '$50+'];

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

  filterBySize() {
    const selectedSizes = Object.entries(this.category)
      .filter(([category, selected]) => selected)
      .map(([category, selected]) => category);
    if (selectedSizes.length === 0) {
      // if no sizes are selected, show all products
      this.filteredProducts = this.productArray;
    } else {
      this.filteredProducts = this.productArray.filter((item) =>
        selectedSizes.includes(item.category)
      );
    }
  }

  isSizeFiltered() {
    return Object.values(this.category).some((size) => size);
  }

  saveItem(item: any) {
    localStorage.setItem('selectedProduct', JSON.stringify(item));
    this.appComponent.navigate('/product');
  }
}
