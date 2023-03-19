import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios, { AxiosResponse } from 'axios';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  constructor(private router: Router, private appComponent: AppComponent) {}

  loginFail: boolean = false;
  errors: Array<any> = [];

  usernameCtrl: FormControl = new FormControl(null, Validators.required);
  passwdCtrl: FormControl = new FormControl(null, Validators.required);
  loginGroup: FormGroup = new FormGroup({
    username: this.usernameCtrl,
    passwd: this.passwdCtrl,
  });

  ngOnInit(): void {}

  attemptLogin() {
    if (this.loginGroup.valid) {
      this.logonCall();
    }
  }

  async logonCall() {
    try {
      const response = await axios.get('http://localhost:8080/api/users/all');

      let responseArray: Array<any> = response.data;

      let loginSuccess: boolean = false;

      for (let i: number = 0; i < responseArray.length; i++) {
        if (
          responseArray[i].username == this.usernameCtrl.value &&
          responseArray[i].password == this.passwdCtrl.value
        ) {
          loginSuccess = true;

          let currentUser = {
            username: this.usernameCtrl.value,
            role: responseArray[i].role
          }
  
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          break;
        } else {
          continue;
        }
      }

      if (loginSuccess == true) {

        this.appComponent.navigate('landing');
      } else {
        this.errors.push("User not found, please try again");
        setTimeout(() => {
          this.errors = [];
        }, 3000);
      }
    } catch (error) {
      this.errors.push(error);
      console.log(this.errors);
    }
  }

  routeToRegister() {
    this.appComponent.navigate('register');
  }
}
