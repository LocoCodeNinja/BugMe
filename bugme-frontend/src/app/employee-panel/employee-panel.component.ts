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
  newProduct: any = {};
  constructor(private router: Router, private appComponent: AppComponent) {}

  renderBug13: boolean;

  ngOnInit(): void {
    this.checkBug13();
    this.checkUser();
    if (this.isGood) {
      this.getProducts();
    }
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
      this.newProduct = {}; // clear form
    } catch (error) {
      console.log(error);
    }
  }
  cancelEditProduct(product: any) {
    product.isEditMode = false;
  }
}
