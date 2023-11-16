import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewAddressConfirmationComponent } from '../../components/profile/new-address-confirmation/new-address-confirmation.component';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastrService } from 'ngx-toastr';
import { NewAddressComponent } from 'src/app/components/profile/new-address/new-address.component';
import { EditAddressComponent } from 'src/app/components/profile/edit-address/edit-address.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  screenWidth:number;
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
  constructor(private dialog: MatDialog, private router: Router, private api_service: ApiService, private toaster: ToastrService){
    this.screenWidth = window.innerWidth
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.screenWidth = window.innerWidth
  }
  
  showSuccess(message: string) {
    this.toaster.success(message, 'Success');
  }
  
  addNewAddress(){
    if ( this.screenWidth >600 ) {
      this.dialog.open(NewAddressComponent)
    } else {
      this.router.navigate(["new-address"])
    }
  }

  editAddress(addressId: number){
    if ( this.screenWidth >600 ) {
      const dialogRef = this.dialog.open(EditAddressComponent, {
        data: { addressId: addressId }
      });
    } else {
      this.router.navigate(['edit-address', addressId]);
    }
  }

  ngOnInit(){
    if(!sessionStorage.getItem("user_signed_in")){
      this.router.navigate(['/'])
    }else{
      let resp = this.api_service.getAddressByUserId();
      resp.then((response)=>{
        this.addresses = response
      })
    }
  }

  deleteAddress(address_id: number){
    const del_resp = this.api_service.deleteAddressbyId(address_id)
    del_resp.then((resp)=>{
      console.log(resp)
      if(resp.status != 403){
        this.showSuccess("Address Deleted Successfully")
        setTimeout(()=>{
          location.reload();
        },2000)
      }
    })
  }
}