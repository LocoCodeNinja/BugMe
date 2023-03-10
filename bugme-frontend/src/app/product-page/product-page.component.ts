import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import axios, { Axios } from 'axios';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {

  selectedProduct: any;
  private token: any;

  constructor(private sanitizer: DomSanitizer) {

  }

  async ngOnInit() {

    this.selectedProduct = JSON.parse(localStorage.getItem('selectedProduct')!);
  }

  product = {
    productname: 'Hosta',
    path: 'assets/StockPhotos/Hosta.jpg',
    price: 26,
    description: 'A large plant with beautifully large leaves. A large plant with beautifully large leaves.'
  }

  addToCart() {
    console.log('Added to cart:', this.product);
  }
}
