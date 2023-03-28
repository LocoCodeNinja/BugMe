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
  searchQuery: string = '';
  filteredProducts!: any[];
  searchPerformed: boolean = false;
  // priceRange = {
  //   $0_100: false,
  //   $100_500: false,
  //   $500_1000: false,
  // };

  applyFilters() {
    let products = this.productArray;

    // Apply size filter
    products = this.filterBySize(products);

    // Apply price filter
    //products = this.filterByPrice(products);

    // Apply search filter
    products = this.search(products);

    this.filteredProducts = products;
  }

  async ngOnInit() {
    await this.getProducts();
  }

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

  search(products: any[]) {
    if (this.searchQuery.trim().length > 0) {
      this.searchPerformed = true;
      return products.filter((item) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.searchPerformed = false;
      return products;
    }
  }

  filterBySize(products: any[]) {
    const selectedSizes = Object.entries(this.category)
      .filter(([category, selected]) => selected)
      .map(([category, selected]) => category);
    if (selectedSizes.length === 0) {
      // if no sizes are selected, show all products
      return products;
    } else {
      return products.filter((item) => selectedSizes.includes(item.category));
    }
  }

  // filterByPrice(products: any[]) {
  //   const selectedPriceRanges = Object.entries(this.priceRange).filter(
  //     ([_, selected]) => selected
  //   );

  //   if (selectedPriceRanges.length === 0) {
  //     // if no price ranges are selected, show all products
  //     return products;
  //   } else {
  //     return products.filter((item) => {
  //       return selectedPriceRanges.some(([priceRange, _]) => {
  //         const [min, max] = priceRange
  //           .split('_')
  //           .map((x) => parseInt(x.replace(/\D/g, ''), 10));
  //         return item.price >= min && item.price <= max;
  //       });
  //     });
  //   }
  // }

  isSizeFiltered() {
    return Object.values(this.category).some((size) => size);
  }

  saveItem(item: any) {
    localStorage.setItem('selectedProduct', JSON.stringify(item));
    this.appComponent.navigate('/product');
  }
}
