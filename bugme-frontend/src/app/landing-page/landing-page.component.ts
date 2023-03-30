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
  allProducts: Array<any>;

  expansionPanel: boolean = false;

  responseArray: Array<any>;

  // priceRange = {
  //   $0_100: false,
  //   $100_500: false,
  //   $500_1000: false,
  // };

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
  }

  async getBugValues(){
    let userId: string = '';

    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    if (this.currentUser != null) {
      userId = this.currentUser.id;
    }

    

    try{
      let result = await axios({
        method: 'POST',
        url: "http://localhost:8080/api/account-bugs/getAllById/" + userId,
        withCredentials: false
      });

      this.responseArray = result.data;

      if(result.status == 200){
        localStorage.setItem("responseArray",JSON.stringify(this.responseArray));
        await this.getProducts();
      }
    }
    catch(exeption){
      console.error(exeption);
    }
  }

  async getAllProducts(){
    let result = await axios({
      method: 'GET',
      url: "http://localhost:8080/api/products/all",
      withCredentials: false
    });

    this.allProducts = result.data;
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
    if(item == this.productArray[0]){
      if(this.responseArray[3] == null){
        localStorage.setItem('selectedProduct', JSON.stringify(item));
        this.appComponent.navigate('/product');
      }
      else if (this.responseArray[3] == false){
        let goodNum: boolean = false;
        let randomPic: number = 0;
        while(goodNum == false){
          randomPic = Math.floor(Math.random() * (this.allProducts.length));
          if(this.allProducts[randomPic].path != item.path){
            goodNum = true;
          }
        }

        console.log(randomPic);


        let wrongObj: any = {
          id: item.id,
          name: item.name,
          path: this.allProducts[randomPic].path,
          price: item.price,
          descriptionPlant: item.descriptionPlant,
          descriptionCare: item.descriptionCare,
          category: item.category
        };

        localStorage.setItem('selectedProduct', JSON.stringify(wrongObj));
        this.appComponent.navigate('/product');
      }
      else if(this.responseArray[4] == null){
        localStorage.setItem('selectedProduct', JSON.stringify(item));
        this.appComponent.navigate('/product');
      }
      else if(this.responseArray[4] == true){
        setTimeout(() => {
          localStorage.setItem('selectedProduct', JSON.stringify(item));
          this.appComponent.navigate('/product');
        }, 5000);
      }
      else{
        localStorage.setItem('selectedProduct', JSON.stringify(item));
        this.appComponent.navigate('/product');
      }
    }
    else{
      localStorage.setItem('selectedProduct', JSON.stringify(item));
      this.appComponent.navigate('/product');
    }
  }

  getWrongImage(path: String){

  }

  bug24(){
    if(this.responseArray[9] == null || this.responseArray[9] == false){
      this.expansionPanel = false;
    }

    else if(this.responseArray[9] == true){
      this.expansionPanel = true;
    }
  }

}
