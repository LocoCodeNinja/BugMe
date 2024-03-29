import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios, { AxiosResponse } from 'axios';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  isZoomable(): boolean {
    return Math.random() >= 0.5;
  }
  constructor(private router: Router, private appComponent: AppComponent) {}
  category = { Tiny: false, Small: false, Medium: false, Large: false };
  searchQuery: string = '';
  filteredProducts!: any[];
  searchPerformed: boolean = false;
  allProducts: Array<any>;

  showBadSearchBox: boolean = false;

  expansionPanel: boolean = false;
  bug11Enabled: boolean;
  responseArray: Array<any>;

  bug22Enabled: boolean = false;

  currentUser: any = {};

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
    this.getBugValues();
    setTimeout(() => {
      this.bug24();
    }, 200);
    setTimeout(() => {
      this.getAllProducts();
    }, 100);
    setTimeout(() => {
      this.checkBug11();
    }, 300);
    setTimeout(() => {
      this.setBug22();
      this.setBug23();
    }, 250);
  }

  setBug22(){
    if(this.responseArray[5] == null || this.responseArray[5] == false){
      this.bug22Enabled = false;
    }
    else if(this.responseArray[5] == true){
      this.bug22Enabled = true;
    }
  }

  setBug23(){
    if(this.responseArray[6] == null || this.responseArray[6] == false){
      this.showBadSearchBox = false;
    }
    else if(this.responseArray[6] == true){
      this.showBadSearchBox = true;
    }
  }

  async getBugValues() {
    let userId: string = '';

    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    if (this.currentUser != null) {
      userId = this.currentUser.id;
    }

    try {
      let result = await axios({
        method: 'POST',
        url: 'http://localhost:8080/api/account-bugs/getAllById/' + userId,
        withCredentials: false,
      });

      this.responseArray = result.data;

      if (result.status == 200) {
        localStorage.setItem(
          'responseArray',
          JSON.stringify(this.responseArray)
        );
        await this.getProducts();
      }
    } catch (exeption) {
      console.error(exeption);
    }
  }

  async getAllProducts() {
    let result = await axios({
      method: 'GET',
      url: 'http://localhost:8080/api/products/all',
      withCredentials: false,
    });

    this.allProducts = result.data;
  }

  productArray: Array<any> = [];

  async getProducts() {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/products/all'
      );

      if(this.responseArray[11] == true && this.responseArray[8] == true){
        for(let i: number = 0; i < response.data.length; i++){
          let tempObj: object = {
            id: response.data[i].id,
            name: '',
            path: 'assets/StockPhotos/Orchid.jpg',
            price: response.data[i].price,
            descriptionPlant: response.data[i].descriptionPlant,
            descriptionCare: response.data[i].descriptionCare,
            category: response.data[i].category
          }
          this.productArray[i] = tempObj;
        }
      }
      else if(this.responseArray[11] == true){
        for(let i: number = 0; i < response.data.length; i++){
          let tempObj: object = {
            id: response.data[i].id,
            name: response.data[i].name,
            path: 'assets/StockPhotos/Orchid.jpg',
            price: response.data[i].price,
            descriptionPlant: response.data[i].descriptionPlant,
            descriptionCare: response.data[i].descriptionCare,
            category: response.data[i].category
          }
          this.productArray[i] = tempObj;
        }
      }
      else if(this.responseArray[8] == true){
        for(let i: number = 0; i < response.data.length; i++){
          let tempObj: object = {
            id: response.data[i].id,
            name: '',
            path: response.data[i].path,
            price: response.data[i].price,
            descriptionPlant: response.data[i].descriptionPlant,
            descriptionCare: response.data[i].descriptionCare,
            category: response.data[i].category
          }
          this.productArray[i] = tempObj;
        }
      }
      else{
        this.productArray = response.data;
      }
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
    if (item == this.productArray[0]) {
      if(this.responseArray[3] == true && this.responseArray[4] == true){
        let goodNum: boolean = false;
        let randomPic: number = 0;
        while (goodNum == false) {
          randomPic = Math.floor(Math.random() * this.allProducts.length);
          if (this.allProducts[randomPic].path != item.path) {
            goodNum = true;
          }
        }

        let wrongObj: any = {
          id: item.id,
          name: item.name,
          path: this.allProducts[randomPic].path,
          price: item.price,
          descriptionPlant: item.descriptionPlant,
          descriptionCare: item.descriptionCare,
          category: item.category,
        };

        setTimeout(() => {
          localStorage.setItem('selectedProduct', JSON.stringify(wrongObj));
          this.appComponent.navigate('/product');
        }, 5000);
      }
      else if (this.responseArray[3] == null) {
        localStorage.setItem('selectedProduct', JSON.stringify(item));
        this.appComponent.navigate('/product');
      } else if (this.responseArray[3] == true) {
        let goodNum: boolean = false;
        let randomPic: number = 0;
        while (goodNum == false) {
          randomPic = Math.floor(Math.random() * this.allProducts.length);
          if (this.allProducts[randomPic].path != item.path) {
            goodNum = true;
          }
        }

        let wrongObj: any = {
          id: item.id,
          name: item.name,
          path: this.allProducts[randomPic].path,
          price: item.price,
          descriptionPlant: item.descriptionPlant,
          descriptionCare: item.descriptionCare,
          category: item.category,
        };

        localStorage.setItem('selectedProduct', JSON.stringify(wrongObj));
        this.appComponent.navigate('/product');
      } else if (this.responseArray[4] == null) {
        localStorage.setItem('selectedProduct', JSON.stringify(item));
        this.appComponent.navigate('/product');
      } else if (this.responseArray[4] == true) {
        setTimeout(() => {
          localStorage.setItem('selectedProduct', JSON.stringify(item));
          this.appComponent.navigate('/product');
        }, 5000);
      } else {
        localStorage.setItem('selectedProduct', JSON.stringify(item));
        this.appComponent.navigate('/product');
      }
    } else {
      localStorage.setItem('selectedProduct', JSON.stringify(item));
      this.appComponent.navigate('/product');
    }
  }

  getWrongImage(path: String) {}

  bug24() {
    if (this.responseArray[7] == null || this.responseArray[7] == false) {
      this.expansionPanel = false;
    } else if (this.responseArray[7] == true) {
      this.expansionPanel = true;
    }
  }

  showSuccess: boolean = false;
  showError: boolean = false;
  emailCtrl: FormControl = new FormControl(null, [Validators.required, Validators.email]);

  showSuccessMessage(){
    if(this.responseArray[15] == null || this.responseArray[15] == false){
      if(this.emailCtrl.valid){
        this.showSuccess = true;
        setTimeout(() => {
          this.showSuccess = false;
        }, 3000);
      }
      else{
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 3000);
      }
    }
    else if(this.responseArray[15]==true){
      if(this.emailCtrl.valid){
        this.showSuccess = true;
        setTimeout(() => {
          this.showSuccess = false;
        }, 3000);
        this.productArray = [];
      }
      else{
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 3000);
      }
    }
  }

  checkBug11(){
    let bug: Array<any> = JSON.parse(localStorage.getItem('responseArray')!);


    if(bug[0] == null){
      this.bug11Enabled = false;
    }
    else{
      this.bug11Enabled = bug[0];
    }
  }
}
