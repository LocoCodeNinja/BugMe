import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BugDetailsComponent } from './bug-details/bug-details.component';
import { CartCheckoutComponent } from './cart-checkout/cart-checkout.component';
import { EmployeePanelComponent } from './employee-panel/employee-panel.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ModifyProductPageComponent } from './modify-product-page/modify-product-page.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
