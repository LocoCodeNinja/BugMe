import { Component } from '@angular/core';

@Component({
  selector: 'app-product-page-test',
  templateUrl: './product-page-test.component.html',
  styleUrls: ['./product-page-test.component.scss']
})
export class ProductPageTestComponent {

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
