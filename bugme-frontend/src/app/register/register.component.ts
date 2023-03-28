import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private appComponent: AppComponent) {}

  success: boolean = false;
  errors: Array<any> = [];

  usernameCtrl = new FormControl(null, Validators.required);
  passwdCtrl = new FormControl(null, [
    Validators.pattern(/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/),
    Validators.required,
  ]);
  roleCtrl = new FormControl('User');
  registerGroup: FormGroup = new FormGroup({
    username: this.usernameCtrl,
    passwd: this.passwdCtrl,
    role: this.roleCtrl,
  });

  async attemptCreate() {
    if (this.validateForm()) {
      try {
        const users = await axios.get('http://localhost:8080/api/users/all');
        if (
          users.data.filter(
            (user: any) => user.username === this.usernameCtrl.value
          ).length > 0
        ) {
          this.errors.push('Username already exists');
        } else {
          const registerInfo = {
            username: this.usernameCtrl.value,
            password: this.passwdCtrl.value,
            role: this.roleCtrl.value,
          };
          const response = await axios.post(
            'http://localhost:8080/api/users',
            registerInfo
          );

          if (response.status === 201) {
            this.showSuccess();
            setTimeout(() => {
              this.routeToTeacher();
            }, 3000);
          } else {
            this.showFailure();
          }
        }
      } catch (error: any) {
        if (error.response.data.errors) {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        } else {
          this.showFailure();
        }
      }
    } else {
      this.errors.push('All inputs are required');
    }
  }

  validateForm() {
    if (this.registerGroup.valid) return true;
    return false;
  }

  showSuccess() {
    this.success = true;
  }

  showFailure() {
    this.errors.push('Unsuccessful account creation, please try again.');
  }

  routeToTeacher() {
    this.appComponent.navigate('teacher');
  }
}
