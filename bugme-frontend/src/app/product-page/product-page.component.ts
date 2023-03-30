import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import axios, { Axios } from 'axios';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent {
  selectedProduct: any;
  productsInCart: Array<any> = [];
  productAddedToCart: boolean = false;
  errors: Array<any> = [];

  //Bug variables
  shownDescription: any = '';

  constructor(
    private sanitizer: DomSanitizer,
    private appComponent: AppComponent
  ) {}

  async ngOnInit() {
    this.selectedProduct = JSON.parse(localStorage.getItem('selectedProduct')!);
    this.productsInCart = JSON.parse(
      localStorage.getItem('productsInCart') || '[]'
    );

    //setting of displayed variable

    //checking if the bug is enabled
    this.checkDescriptionBug();
  }

  checkDescriptionBug() {
    let bug: Array<any> = JSON.parse(localStorage.getItem('responseArray')!);

    if (bug[1] == null) {
      this.shownDescription += this.selectedProduct.descriptionPlant;
    } else if (bug[1] == true) {
      this.shownDescription +=
        this.selectedProduct.descriptionPlant +
        this.selectedProduct.descriptionPlant;
    } else {
      this.shownDescription += this.selectedProduct.descriptionPlant;
    }
  }

  showDescriptionBug(isEnabled: boolean) {
    if (isEnabled) {
      this.shownDescription += this.selectedProduct.descriptionPlant;
    }
  }

  addToCart() {
    if (this.productsInCart) {
      this.productsInCart.push(this.selectedProduct);
    } else {
      this.productsInCart = [this.selectedProduct];
    }

    this.productAddedToCart = true;
    localStorage.setItem('productsInCart', JSON.stringify(this.productsInCart));
    window.location.reload();
  }
}
