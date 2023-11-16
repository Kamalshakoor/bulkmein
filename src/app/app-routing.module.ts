import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { SupportComponent } from './pages/support/support.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { MobileLoginComponent } from './pages/mobile-specific/mobile-login/mobile-login.component';
import { MobileSignupComponent } from './pages/mobile-specific/mobile-signup/mobile-signup.component';
import { CreateAccountComponent } from './pages/mobile-specific/mobile-create-account/create-account.component';
import { MobileOtpComponent } from './pages/mobile-specific/mobile-otp/mobile-otp.component';
import { MobileForgetPasswordComponent } from './pages/mobile-specific/mobile-forget-password/mobile-forget-password.component';
import { NewaddressComponent } from './pages/mobile-specific/newaddress/newaddress.component';
import { EditaddressComponent } from './pages/mobile-specific/editaddress/editaddress.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "products", component: ProductsComponent},
  {path: "support", component: SupportComponent},
  {path: "about-us", component: AboutComponent},
  {path: "product-details", component: ProductDetailsComponent},
  {path: "cart", component: CartComponent},
  {path: "profile", component: ProfileComponent},
  {path: "edit-profile", component: EditProfileComponent},
  {path: "reset-password", component: ResetPasswordComponent},
  {path: "my-orders", component: OrdersComponent},
  {path: "login", component: MobileLoginComponent},
  {path: "signup", component: MobileSignupComponent},
  {path: "new-address", component: NewaddressComponent},
  {path: "edit-address/:addressId", component: EditaddressComponent},
  {path: "create-account", component: CreateAccountComponent},
  {path: "forget-password", component: MobileForgetPasswordComponent},
  {path: "verify-otp", component: MobileOtpComponent},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
