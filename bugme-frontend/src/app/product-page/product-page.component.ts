import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {
  public imagePath: string;

  constructor(private sanitizer: DomSanitizer) {
    // Set the image path
    this.imagePath = "assets/images/plant.jpg";
  }

  product = {
    name: 'Tiger Lilly',
    path: '',
    price: '10.99',
    description: 'Good plant.'
  };

  addToCart() {
    console.log('Added to cart:', this.product);
  }
}
