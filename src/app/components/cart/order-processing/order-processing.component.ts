import { Component } from '@angular/core';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-order-processing',
  templateUrl: './order-processing.component.html',
  styleUrls: ['./order-processing.component.css']
})
export class OrderProcessingComponent {
  constructor(private notify: NotificationService){}

  downloadInvoice(){
    this.notify.proccessInfo("Thank You For Your Order, Invoice is not generated yet")
  }
}
