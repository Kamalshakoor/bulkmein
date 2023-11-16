import { Component,Renderer2,HostListener,ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../../navbar/login/login.component';
import { CartQtyUpdateService } from '../../../services/cart/cart-qty-update.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ApiService } from 'src/app/services/api/api.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logged_in:boolean = false
  screenWidth: number;
  cartQty:number = 1
  isNavbarCollapsed: boolean = true;
  subtotal:number = 0

  @ViewChild('spanElement') spanElement: ElementRef | undefined;
  products:{productName:string, productId:number}[] = [];
  cart_items: any[] = [];

  matching_products:{name:string, id:number}[] = [];
  isLogin: boolean = false;
  constructor(private dialog: MatDialog, private renderer: Renderer2, private cartqtyservice: CartQtyUpdateService, private api_service: ApiService, private router: Router, private notify: NotificationService){
    this.screenWidth = window.innerWidth;
    var Isauth =  sessionStorage.getItem("user_signed_in");
    if (Isauth == "true") { this.isLogin = true; }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    let triangle = document.querySelector(".triangle");
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 1271){
      if(!triangle?.classList.contains("hidden")){
        this.renderer.setStyle(triangle, 'display', 'none');
      }
    }else if(!triangle?.classList.contains("hidden")){
      this.renderer.setStyle(triangle, 'display', 'block');
    }
  }

  logincheck() {
    if (this.isLogin == true) {
      this.router.navigateByUrl('products');
    } else {
      this.dialog.open(LoginComponent)
    }
  }

  ngOnInit(){
    this.cartqtyservice.cartItems$.subscribe(items => {
      this.cart_items = items;
      this.subtotal = 0
      this.cart_items.forEach((ci)=>{
        this.subtotal += (ci.price) * (ci.quantity)
      })
    });
    const accessToken = sessionStorage.getItem("accessToken") || ""
    let login_response = this.api_service.isUserLoggedIn(accessToken)
    login_response.then((resp)=>{
     if(resp.status == 403){
     this.logged_in = false
     sessionStorage.removeItem("user_signed_in");
     sessionStorage.removeItem("accessToken");
     }else{
     this.logged_in = true
     sessionStorage.setItem("accessToken",accessToken)
     sessionStorage.setItem("user_signed_in", "true")
     }

     if(sessionStorage.getItem("user_signed_in") && sessionStorage.getItem("accessToken")){
       let cart_resp = this.api_service.getCart();
       cart_resp.then((response)=>{
         this.cart_items = response.content
         this.subtotal = 0
         this.cart_items.forEach((ci)=>{
           this.subtotal += (ci.price) * (ci.quantity)
         })
       })
     }
    })

    let searchable_products_resp = this.api_service.getProductListForSearch();
    searchable_products_resp.then((resp:any)=>{
      this.products = resp.productList
    })
  }

  updateMiniCartQuantity(spanElement: HTMLElement, typeofupdate: string, interval:any, productId: number,minimumQuantity:number,maxQuantity:number): void {
    let cartQty = this.cartqtyservice.updateQty(spanElement, typeofupdate, interval, minimumQuantity, maxQuantity);
    let userData = {
      fkProductId: productId,
      quantity: cartQty
    }

    let res = this.api_service.UpdateCartItemQuantity(userData);
    res.then((response)=>{
      if(response.count != null || response.count != undefined){
        this.cart_items = response.content
        this.subtotal = 0
        this.cart_items.forEach((ci)=>{
          this.subtotal += (ci.price) * (ci.quantity)
        })
      }
    })
  }

  openSearch(){
    const overlay = document.querySelector(".overlay");
    this.renderer.removeClass(overlay, "hidden");
  }

  closeSearch(){
    const overlay = document.querySelector(".overlay");
    if ( overlay && !overlay.classList.contains("hidden") ) {
      overlay.classList.add("hidden")
    }
  }

  openDialog(){
    if ( this.screenWidth <= 600 ) {
      this.router.navigate(["/login"]);
    }else{
      this.dialog.open(LoginComponent)
    }

  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  clearResults(){
    this.matching_products = []
  }

  openCart(){
    if(!sessionStorage.getItem("user_signed_in")){
      this.dialog.open(LoginComponent)
    }else{
      let cart = document.querySelector(".card-cart");
      let triangle = document.querySelector(".triangle");
      if (cart?.classList.contains('hidden')) {
        this.renderer.removeClass(cart, "hidden");
        if(!(this.screenWidth <= 1271)){
          this.renderer.removeClass(triangle, "hidden")
        }
      }else{
        this.renderer.addClass(cart, "hidden");
        if (!triangle?.classList.contains('hidden')) {
          this.renderer.addClass(triangle, "hidden")
        }
      }
    }
  }

  // Here we will implement product search functionality
  search(event: any){
    this.matching_products = []
    let search_term = ((event.target.value).toLowerCase()).trim();
    if(search_term != ""){
      this.products.forEach(product=>{
        let prod = product.productName.toLowerCase();
        if(prod.match(search_term)){
          this.matching_products.push({
            name: product.productName,
            id: product.productId
          })
        }
      })
    }
  }

  Logout(){
    sessionStorage.removeItem("accessToken")
    sessionStorage.removeItem("user_signed_in")
    this.notify.proccessSuccessfull("Successfully Logged Out")
    setTimeout(()=>{
      location.reload()
    }, 1000)
  }
}
