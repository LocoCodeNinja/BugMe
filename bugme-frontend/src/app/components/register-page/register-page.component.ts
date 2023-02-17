import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  constructor(
    private appComponent: AppComponent
  ) {
  }

  success: boolean = false;
  errors: Array<any> = [];

  usernameCtrl = new FormControl(null, Validators.required);
  emailCtrl = new FormControl(null, [Validators.required, Validators.email]);
  passwdCtrl = new FormControl(null, [Validators.pattern(/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/), Validators.required]);
  registerGroup: FormGroup = new FormGroup({ email: this.emailCtrl, passwd: this.passwdCtrl });

  async attemptCreate() {
    if (this.validateForm()) {
      try {
        let registerInfo = {
          "email": this.emailCtrl.value,
          "username": this.usernameCtrl.value,
          "password": this.passwdCtrl.value
        }
        const response = await axios.post('https://localhost:7105/Register', registerInfo);

        if (response.status = 200) {
          this.showSuccess();
          setTimeout(() => {
            this.routeToLogin();
          }, 3000);
        }
        else if (response.status != 200) {
          this.showFailure();
        }
      } catch (error: any) {
        if (error.response.data.errors) {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        }
      }
    }
  }

  validateForm() {
    if (this.registerGroup.valid)
      return true;
    return false;
  }

  showSuccess() {
    this.success = true;
  }

  showFailure() {
    this.errors.push("Unsuccessfull registration attempt, please try again.");
  }

  routeToLogin() {
    this.appComponent.navigate("");
  }
}
