import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatBadgeModule } from '@angular/material/badge';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { WebBannerComponent } from './web-banner/web-banner.component';
import { ProfileComponent } from './UNUSEDxx/profile.component';
import { RegisterComponent } from './register/register.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartCheckoutComponent } from './cart-checkout/cart-checkout.component';
import { TeacherPanelComponent } from './teacher-panel/teacher-panel.component';
import { ModifyProductPageComponent } from './UNUSED/modify-product-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { FooterComponent } from './footer/footer.component';
import { EmployeePanelComponent } from './employee-panel/employee-panel.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { BugDetailsComponent } from './UNUSEDx/bug-details.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BUG32Component } from './bug32/bug32.component';
import { BUG43Component } from './bug43/bug43.component';
import { SubscribePanelComponent } from './subscribe-panel/subscribe-panel.component';
import { FooterTrademarkComponent } from './footer-trademark/footer-trademark.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LandingPageComponent,
    WebBannerComponent,
    ProfileComponent,
    RegisterComponent,
    ProductPageComponent,
    CartCheckoutComponent,
    TeacherPanelComponent,
    ModifyProductPageComponent,
    AboutPageComponent,
    FooterComponent,
    EmployeePanelComponent,
    BugDetailsComponent,
    BUG32Component,
    BUG43Component,
    SubscribePanelComponent,
    FooterTrademarkComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatGridListModule,
    MatDividerModule,
    MatExpansionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    MatSliderModule,
    MatBadgeModule,
    MatSlideToggleModule,
    MatDialogModule,
    HttpClientModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
