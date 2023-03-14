import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-modify-product-page',
  templateUrl: './modify-product-page.component.html',
  styleUrls: ['./modify-product-page.component.scss']
})
export class ModifyProductPageComponent {

  constructor(
    private appComponent: AppComponent
  ) {
  }
  
  loginFail: boolean = false;
  errors: Array<any> = [];

  //testing
  categories: Array<string> = ['Small', 'Medium', 'Large'];
  categoryCtrl = new FormControl();


  productnameCtrl: FormControl = new FormControl(null, Validators.required);
  //categoryCtrl: FormControl = new FormControl(null, Validators.required);
  priceCtrl: FormControl = new FormControl(null, Validators.required);
  descriptionPlantCtrl: FormControl = new FormControl(null, Validators.required);
  descriptionCareCtrl: FormControl = new FormControl(null, Validators.required);
  productGroup: FormGroup = new FormGroup({
    productname: this.productnameCtrl,
    category: this.categoryCtrl,
    price: this.priceCtrl,
    descriptionPlant: this.descriptionCareCtrl,
    descriptionCare: this.descriptionCareCtrl
  });
  
  saveChanges() {

  }

  
  cancelChanges() {
    this.appComponent.navigate('landing');
  }
}
