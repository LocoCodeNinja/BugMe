import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import axios, { Axios } from 'axios';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {

  selectedProduct: any;
  productsInCart: Array<any> = [];
  productAddedToCart: boolean = false;
  errors: Array<any> = [];

  //Bug variables
  bugEnabled :boolean= true;
  shownDescription: any = "";

  constructor(private sanitizer: DomSanitizer,
    private appComponent: AppComponent
    ) {
  }

  async ngOnInit() {
    this.selectedProduct = JSON.parse(localStorage.getItem('selectedProduct')!);
    this.productsInCart = JSON.parse(localStorage.getItem("productsInCart") || "[]");

    //setting of displayed variable
    this.shownDescription += this.selectedProduct.description_plant;

    //checking if the bug is enabled
    
    this.showDescriptionBug(false);
  } 

  showDescriptionBug(isEnabled: boolean){
    if(isEnabled){
      this.shownDescription += this.selectedProduct.description_plant;
    }
  }

  addToCart() {
    if(this.productsInCart.length != 0){
      let isInCart: boolean = false;
      for(let i: number = 0; i < this.productsInCart.length; i++){
        if(this.productsInCart[i].productname == this.selectedProduct.productname){
          isInCart = true;
        }
      }
      
      if(isInCart == false){
        this.productsInCart.push(this.selectedProduct);
        this.productAddedToCart = true;
        localStorage.setItem("productsInCart", JSON.stringify(this.productsInCart));
      }
      else{
        this.errors.push("Product is already in cart");
      }
    }
    else{
      this.productsInCart.push(this.selectedProduct);
      this.productAddedToCart = true;
      localStorage.setItem("productsInCart", JSON.stringify(this.productsInCart));
    }
  }
}
