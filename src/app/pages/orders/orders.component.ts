import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders:{
    orderId:string,
    orderedProducts:  {
      orderedAt: string,
      totalAmount: number,
      address: string,
      productId: number,
      productPreviewImage: string,
      documentsLink: string,
      productName: string,
      status: string
  }[]
  }[] = []

  constructor(private router: Router,private api_service:ApiService, private notify: NotificationService){}
  ngOnInit(){
    if(!sessionStorage.getItem("user_signed_in")){
      this.router.navigate(['/'])
    }else{
      let resp = this.api_service.savedOrders();
      resp.then((response)=>{
        console.log(response)
        this.orders = response.listing
      })
    }
  }

  orderNow(){
    this.router.navigate(["/products"])
  }

  downloadInvoice(documentLink:any){
    console.log(documentLink)
    if(documentLink == "NA"){
      this.notify.proccessInfo("Thank You For Your Order, Invoice is not generated yet")
    }else{
      window.location.href = documentLink
    }
  }
}
