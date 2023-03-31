import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-employee-panel',
  templateUrl: './employee-panel.component.html',
  styleUrls: ['./employee-panel.component.scss'],
})
export class EmployeePanelComponent {
  errors: Array<any> = [];
  products: Array<any> = [];
  currentUser: any = {};
  isGood: boolean = false;

  showCreated: boolean = false;

  newProduct: any = {};
  constructor(private router: Router, private appComponent: AppComponent) {}

  renderBug13: boolean;

  availableImages: Array<any> = [
    'assets/StockPhotos/AloeVera.jpg',
    'assets/StockPhotos/Caradonna.jpg',
    'assets/StockPhotos/Cosmos.jpg',
    'assets/StockPhotos/Dahlia.jpg',
    'assets/StockPhotos/Daisy.jpg',
    'assets/StockPhotos/Daylily.jpg',
    'assets/StockPhotos/ForgetMeNot.jpg',
    'assets/StockPhotos/Geranium.jpg',
    'assets/StockPhotos/Hosta.jpg',
    'assets/StockPhotos/Hydrangea.jpg',
    'assets/StockPhotos/Lavender.jpg',
    'assets/StockPhotos/Moonfire.jpg',
    'assets/StockPhotos/Orchid.jpg',
    'assets/StockPhotos/ParrotFlower.jpg',
    'assets/StockPhotos/Rose.jpg',
    'assets/StockPhotos/Strawflower.jpg',
    'assets/StockPhotos/Succulent.jpg',
    'assets/StockPhotos/Sunflower.jpg',
    'assets/StockPhotos/Tulip.jpg',
    'assets/StockPhotos/Windflower.jpg',
  ];

  ngOnInit(): void {
    this.checkUser();
    if (this.isGood) {
      this.getProducts();
    }
    this.checkBug13();
    // setTimeout(() => {
    //   this.getAllProducts();
    // }, 100);
  }

  
  async getAllProducts(){
    let result = await axios({
      method: 'GET',
      url: "http://localhost:8080/api/products/all",
      withCredentials: false
    });

    this.allProducts = result.data;
  }

  checkBug13(){
    let bug: Array<any> = JSON.parse(localStorage.getItem('responseArray')!);

    if(bug[2] == null){
      this.renderBug13 = false;
    }
    else if(bug[2] == true){
      this.renderBug13 = true;
    }
    else{
      this.renderBug13 = false;
    }
  }

  checkUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    if (this.currentUser != null) {
      if (this.currentUser.role != 'Employee') {
        this.appComponent.navigate('/landing');
      } else {
        this.isGood = true;
      }
    } else {
      this.appComponent.navigate('');
    }
  }

  async getProducts() {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/products/all'
      );
      this.products = response.data.map((product: any) => {
        return {
          ...product,
          isEditMode: false,
        };
      });
    } catch (error) {
      this.errors.push(error);
      console.log(this.errors);
    }
  }

  toggleProductEditMode(product: any) {
    product.isEditMode = !product.isEditMode;
  }

  async saveProduct(product: any) {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/products/${product.id}`,
        {
          name: product.name,
          path: product.path,
          price: product.price,
          descriptionPlant: product.description_plant,
          descriptionCare: product.description_care,
          category: product.category,
        }
      );
      product.isEditMode = false; // cancel edit mode
    } catch (error) {
      this.errors.push(error);
      console.log(this.errors);
    }
  }
  async createProduct() {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/products',
        this.newProduct
      );
      this.products.push(response.data);
      this.showCreated = true;
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }
  cancelEditProduct(product: any) {
    product.isEditMode = false;
  }

  allProducts: Array<any>;


}
