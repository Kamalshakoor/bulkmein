import { Component, HostListener, Inject } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { CartQtyUpdateService } from '../../services/cart/cart-qty-update.service';
import { OrderProcessingComponent } from '../../components/cart/order-processing/order-processing.component';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NewAddressComponent } from 'src/app/components/profile/new-address/new-address.component';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart_items:{
    quantity: number,
    productId: number,
    maxQuantity: number,
    price: number,
    quantityInterval: number,
    quantityUnit: string,
    minimumQuantity: number,
    productName: string,
    previewImage: string
  }[] = []
  addresses:  {
    addressId: number,
    userId: number,
    country: string,
    fullName: string ,
    pinCode: number,
    houseNumber: string,
    area: string,
    landmark:  string,
    city: string,
    state: string,
    active: true
  }[] = []
  shipping_cost: {
    shippingTax: number;
    shippingCost: number;
    productGst: number;
    productBasePrice: number;
    orderTotal: number;
  } = {
    shippingTax: 0,
    shippingCost: 0,
    productGst: 0,
    productBasePrice: 0,
    orderTotal: 0
  };

  cartQty:number = 0;
  subtotal:number = 0;
  shipping_address_id:number = 0;
  active_address:number = 0;
  payment_method:any = null

  constructor(@Inject(DOCUMENT) private document: Document,private cartqtyservice: CartQtyUpdateService, private dialog: MatDialog, private router:Router, private api_service: ApiService, private notify: NotificationService){}

  ngOnInit(){
    if(!sessionStorage.getItem("user_signed_in")){
      this.router.navigate(['/'])
    }else{
      let resp = this.api_service.getCart();
      resp.then((response)=>{
        console.log(response.content)
        this.cart_items = response.content
        this.cart_items.forEach((ci)=>{
          this.subtotal += (ci.price) * (ci.quantity)
        })
      })

      let address_resp = this.api_service.getAddressByUserId()
      address_resp.then((resp:any)=>{
        this.addresses = resp
      })
    }
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const myAbsolutelyNotNullElement = document.getElementById('rowparanets')!

    if (document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80) {
      if (myAbsolutelyNotNullElement!=null){
        myAbsolutelyNotNullElement.classList.add('showtotalcard')
      }
    } else {
      myAbsolutelyNotNullElement.classList.remove('showtotalcard')
    }
  }
  removeItemFromCart(productId:number){
    let userData = {fkProductId: productId}
    let resp = this.api_service.removeItemFromCart(userData)
    resp.then((response)=>{
      if(response.cartCount != undefined || response.cartCount != null){
        this.notify.proccessSuccessfull("Item removed from cart successfully")
        setTimeout(()=>{
          location.reload();
        }, 1100)
      }else{
        this.notify.someThingWentWrong();
      }
    })
  }

  setDeliveryAddress(address_id:number){
    this.shipping_address_id = address_id
  }

  addAddress(){
    this.dialog.open(NewAddressComponent)
  }

  setActiveDeliveryAddress(){
    if( this.shipping_address_id == 0 ){
      this.notify.processWarning("Please Select A Delivery Address First")
    }else{
      this.shipping_cost = {
        shippingTax: 0,
        shippingCost: 0,
        productGst: 0,
        productBasePrice: 0,
        orderTotal: 0
      };
      this.active_address = this.shipping_address_id
      let shipping_items: { addressId: number, productId: number, quantity: number }[] = [];
      this.cart_items.forEach((cart_item)=>{
        shipping_items.push({
          addressId: this.active_address,
          productId: cart_item.productId,
          quantity: cart_item.quantity
        })
      })

      let resp = this.api_service.calculateShippingCost(shipping_items)
      resp.then((response)=>{
        this.shipping_cost = response
      })
    }
  }

  setPaymentMethod(method:string){
    if(method == "Offline"){
      this.payment_method = "Offline"
    }
  }

  PlaceOrder(){
    if ( this.active_address == 0 ) {
      this.notify.processWarning("Please Select A Delivery Address First")
    }
    else {
      if ( this.payment_method != null ){
        let shipping_items: { addressId: number, productId: number, quantity: number }[] = [];
        this.cart_items.forEach((cart_item)=>{
          shipping_items.push({
            addressId: this.active_address,
            productId: cart_item.productId,
            quantity: cart_item.quantity
          })
        })
        let resp = this.api_service.PlaceOrder(shipping_items);
        resp.then((response)=>{
          if(response.cartCount != null && response.cartCount != undefined && response.cartCount == 0){
            this.notify.proccessSuccessfull("Your Order Has Been Placed Successfully")
            const dialogRef: MatDialogRef<OrderProcessingComponent> = this.dialog.open(OrderProcessingComponent);
            dialogRef.afterClosed().subscribe(() => {
             location.href = "/my-orders"
            });
          }
        })
      } else {
        this.notify.processWarning("Please Choose a Payment Method")
      }
    }
  }

  updateMiniCartQuantity(spanElement: HTMLElement, typeofupdate: string, interval:any, productId: number,minimumQuantity: number,maxQuantity:number): void {
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
        this.cartqtyservice.updateCartItems(this.cart_items);
      }
    })
  }
}
