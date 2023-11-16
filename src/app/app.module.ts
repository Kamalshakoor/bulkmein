import {CUSTOM_ELEMENTS_SCHEMA ,NgModule } from '@angular/core';
// import * as jQuery from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

// register Swiper custom elements
register();
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { CarouselComponent } from './components/home/carousel/carousel.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ProductsComponent } from './pages/products/products.component';
import { SupportComponent } from './pages/support/support.component';
import { FaqComponent } from './components/shared/faq/faq.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsSliderComponent } from './components/shared/products-slider/products-slider.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { LoginComponent } from './components/navbar/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './components/navbar/signup/signup.component';
import { MobileSignupComponent } from './pages/mobile-specific/mobile-signup/mobile-signup.component';
import { OtpComponent } from './components/navbar/otp/otp.component';
import { ForgetPasswordComponent } from './components/navbar/forget-password/forget-password.component';
import { CompaniesComponent } from './components/home/companies/companies.component';
import { CreateAccountComponent } from './components/navbar/create-account/create-account.component';
import { CartComponent } from './pages/cart/cart.component';
import { BulkOrdersComponent } from './components/shared/bulk-orders/bulk-orders.component';
import { OrderProcessingComponent } from './components/cart/order-processing/order-processing.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { NewAddressConfirmationComponent } from './components/profile/new-address-confirmation/new-address-confirmation.component';
import { NewAddressComponent } from './components/profile/new-address/new-address.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ProfileUpdatedComponent } from './components/profile/profile-updated/profile-updated.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { UserProfileSidebarComponent } from './components/shared/user-profile-sidebar/user-profile-sidebar.component';
import { EditAddressComponent } from './components/profile/edit-address/edit-address.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ForgetPasswordOTPComponent } from './components/navbar/forget-password-otp/forget-password-otp.component';
import { ChangePasswordOTPComponent } from './components/navbar/change-password-otp/change-password-otp.component';
import { MobileLoginComponent } from './pages/mobile-specific/mobile-login/mobile-login.component';
import { MobileOtpComponent } from './pages/mobile-specific/mobile-otp/mobile-otp.component';
import { MobileForgetPasswordComponent } from './pages/mobile-specific/mobile-forget-password/mobile-forget-password.component';
import { NewaddressComponent } from './pages/mobile-specific/newaddress/newaddress.component';
import { EditaddressComponent } from './pages/mobile-specific/editaddress/editaddress.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CarouselComponent,
    FooterComponent,
    ProductsComponent,
    SupportComponent,
    FaqComponent,
    AboutComponent,
    ProductsSliderComponent,
    ProductDetailsComponent,
    LoginComponent,
    SignupComponent,
    OtpComponent,
    ForgetPasswordComponent,
    CompaniesComponent,
    CreateAccountComponent,
    CartComponent,
    BulkOrdersComponent,
    OrderProcessingComponent,
    ProfileComponent,
    EditProfileComponent,
    NewAddressConfirmationComponent,
    NewAddressComponent,
    ResetPasswordComponent,
    ProfileUpdatedComponent,
    OrdersComponent,
    UserProfileSidebarComponent,
    EditAddressComponent,
    ForgetPasswordOTPComponent,
    ChangePasswordOTPComponent,
    MobileLoginComponent,
    MobileSignupComponent,
    MobileOtpComponent,
    MobileForgetPasswordComponent,
    NewaddressComponent,
    EditaddressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    CarouselModule,
    CommonModule,
    ToastrModule.forRoot(
      {
        preventDuplicates: true
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
