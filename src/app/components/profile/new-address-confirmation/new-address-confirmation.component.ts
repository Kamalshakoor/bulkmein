import { Component,ViewChild, ElementRef } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { CreateAccountComponent } from '../../navbar/create-account/create-account.component';
import { NewAddressComponent } from '../new-address/new-address.component';

@Component({
  selector: 'app-new-address-confirmation',
  templateUrl: './new-address-confirmation.component.html',
  styleUrls: ['./new-address-confirmation.component.css']
})
export class NewAddressConfirmationComponent {
  constructor(private dialogref: MatDialogRef<NewAddressConfirmationComponent>,private dialog: MatDialog) {}
  closeDialog(){
    this.dialogref.close();
  }
  verifyOTP(){
    this.dialogref.close();
    this.dialog.open(NewAddressComponent)
  }

}
