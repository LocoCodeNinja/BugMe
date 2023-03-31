import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BugDetailsComponent } from './UNUSEDx/bug-details.component';
import { BUG32Component } from './bug32/bug32.component';
import { BUG43Component } from './bug43/bug43.component';
import { CartCheckoutComponent } from './cart-checkout/cart-checkout.component';
import { EmployeePanelComponent } from './employee-panel/employee-panel.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ModifyProductPageComponent } from './UNUSED/modify-product-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { RegisterComponent } from './register/register.component';
import { TeacherPanelComponent } from './teacher-panel/teacher-panel.component';

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
    path: 'modify',
    component: ModifyProductPageComponent,
  },
  {
    path: 'employee',
    component: EmployeePanelComponent,
  },
  {
    path: 'bugs',
    component: BugDetailsComponent,
  },
  {
    path: 'checkoutLoading',
    component: BUG32Component,
  },
  {
    path: 'checkoutLoad',
    component: BUG43Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
