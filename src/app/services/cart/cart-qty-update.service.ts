import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartQtyUpdateService {
  cart_qty:number = 0
  constructor() { }
  private cartItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  updateCartItems(items: any[]) {
    this.cartItemsSubject.next(items);
  }
  
  updateQty(spanElement: HTMLElement, typeofupdate: string, interval: any, minimumQuantity:number, maxQuantity:number): number {
    this.cart_qty = parseInt(spanElement.textContent ?? '0', 10);
    if ( typeofupdate == "inc" ) {

      if (isNaN( this.cart_qty )) {
        this.cart_qty = minimumQuantity
      } else {
        if (this.cart_qty >= maxQuantity){
          this.cart_qty = maxQuantity
        } else {
          this.cart_qty += interval
        }
      }


    } else if (typeofupdate="dec") {

      if ( isNaN(this.cart_qty) ) {
        this.cart_qty = minimumQuantity
      } else if (this.cart_qty>1) {
        let min_check = this.cart_qty - interval
        if ( min_check > minimumQuantity ) {
          this.cart_qty -= interval
        } else {
          this.cart_qty = minimumQuantity
        }
      }
    }
    return this.cart_qty;
  }
}
