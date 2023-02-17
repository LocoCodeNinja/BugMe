import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(private router: Router, private appComponent: AppComponent) {}

  loginFail: boolean = false;

  usernameCtrl: FormControl = new FormControl(null, Validators.required);
  passwdCtrl: FormControl = new FormControl(null, Validators.required);
  loginGroup: FormGroup = new FormGroup({
    username: this.usernameCtrl,
    passwd: this.passwdCtrl,
  });

  ngOnInit(): void {}

  attemptLogin() {
    if (this.loginGroup.valid) {
      this.appComponent.navigate('landing');
    }
  }

  routeToRegister() {
    this.appComponent.navigate('register');
  }
}
