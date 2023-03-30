import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.scss'],
})
export class CartCheckoutComponent implements OnInit {
  productsInCart: Array<any> = [];
  orderNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
  cartCost: number = 0;
  taxCost: number = 0;
  fullCost: number = 0;

  productsPurchased: boolean = false;
  submitError: boolean = false;
  cartError: boolean = false;
  cartCleared: boolean = false;

  creditCardNumCtrl: FormControl = new FormControl(null, [
    Validators.required,
    Validators.pattern(
      '^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35d{3})d{11})$'
    ),
  ]);
  expiryCtrl: FormControl = new FormControl(null, [
    Validators.required,
    Validators.pattern(`^[0-9][0-9][/][0-9][0-9]$`),
  ]);
  cvcCtrl: FormControl = new FormControl(null, [
    Validators.required,
    Validators.pattern(/^\d{3}$/),
  ]);
  cardGroup: FormGroup = new FormGroup({
    creditCardNum: this.creditCardNumCtrl,
    expiry: this.expiryCtrl,
    cvc: this.cvcCtrl,
  });

  constructor(private appComponent: AppComponent) {}

  ngOnInit(): void {
    this.productsInCart = JSON.parse(
      localStorage.getItem('productsInCart') || '[]'
    );
    this.calcPrices();
  }

  clearCart() {
    this.cartCleared = true;
    localStorage.removeItem('productsInCart');
    window.location.reload();
    setTimeout(() => {
      this.appComponent.navigate('/landing');
    }, 3000);
  }

  purchaseCart() {
    if (this.cardGroup.valid) {
      this.productsPurchased = true;
    } else {
      this.submitError = true;
      setTimeout(() => {
        this.submitError = false;
      }, 3000);
    }
  }

  calcPrices() {
    for (let item of this.productsInCart) {
      this.cartCost += item.price;
    }
    // this.cartCost = parseFloat(this.cartCost.toFixed(2));
    this.taxCost = parseFloat((this.cartCost * 0.13).toFixed(2));
    this.fullCost = parseFloat((this.cartCost * 1.13).toFixed(2));
  }
}
