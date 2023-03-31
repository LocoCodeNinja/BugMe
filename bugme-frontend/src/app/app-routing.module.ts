import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BUG32Component } from './bug32/bug32.component';
import { BUG43Component } from './bug43/bug43.component';
import { CartCheckoutComponent } from './cart-checkout/cart-checkout.component';
import { EmployeePanelComponent } from './employee-panel/employee-panel.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { RegisterComponent } from './register/register.component';
import { TeacherPanelComponent } from './teacher-panel/teacher-panel.component';
import { Bug42Component } from './bug42/bug42.component';
import { Bug41Component } from './bug41/bug41.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
  {
    path: 'landing',
    component: LandingPageComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'product',
    component: ProductPageComponent,
  },
  {
    path: 'checkout',
    component: CartCheckoutComponent,
  },
  {
    path: 'teacher',
    component: TeacherPanelComponent,
  },
  {
    path: 'employee',
    component: EmployeePanelComponent,
  },
  {
    path: 'checkoutLoading',
    component: BUG32Component,
  },
  {
    path: 'checkoutLoad',
    component: BUG43Component,
  },
  {
    path: 'badGateway',
    component: Bug42Component
  },
  {
    path: '?',
    component: Bug41Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
