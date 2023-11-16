import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { FormBuilder, FormGroup,Validators,AbstractControl } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editaddress',
  templateUrl: './editaddress.component.html',
  styleUrls: ['./editaddress.component.css']
})
export class EditaddressComponent {
  form:any =  FormGroup;
  screenWidth:number;
  addressId:number = 0;
  
  isCountryInputDisabled: boolean = true; 
  addressData:{
    addressId: number,
    userId: number,
    country: string,
    fullName: string,
    pinCode: number,
    houseNumber: string,
    area: string,
    landmark:string,
    city: string,
    state: string,
  } = {
    addressId: 0,
    userId: 0,
    country: '',
    fullName: '',
    pinCode: 0,
    houseNumber: '',
    area: '',
    landmark: '',
    city: '',
    state: ''
  };

  error = ""

  constructor(private fb: FormBuilder, private notify: NotificationService, private api_service: ApiService, private route: ActivatedRoute, private router: Router) {
    this.screenWidth = window.innerWidth
    this.route.params.subscribe(params => {
      this.addressId = params['addressId'];
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.screenWidth = window.innerWidth;
  }
  
  ngOnInit(){
    if(!sessionStorage.getItem("user_signed_in")){
      this.router.navigate(['/'])
    }

    this.addressData = {
      addressId: 0,
      userId: 0,
      country: '',
      fullName: '',
      pinCode: 0,
      houseNumber: '',
      area: '',
      landmark: '',
      city: '',
      state: ''
    };

    this.form = this.fb.group({
      fullname: [this.addressData.fullName,Validators.required],
      house_no: [this.addressData.houseNumber, Validators.required],
      area: [this.addressData.area,Validators.required],
      city: [this.addressData.city,Validators.required],
      pin_code: [this.addressData.pinCode,Validators.required],
      landmark: [this.addressData.landmark, Validators.required],
      state: [this.addressData.state,Validators.required],
    });

    if ( this.addressId == 0 || !this.addressId) {
      this.router.navigate(["/"]);
    }

    console.log(this.addressId)
    let address_resp = this.api_service.getAddressById(this.addressId);
    address_resp.then((resp)=>{
      this.addressData = resp
      this.form = this.fb.group({
        fullname: [this.addressData.fullName,Validators.required],
        house_no: [this.addressData.houseNumber, Validators.required],
        area: [this.addressData.area,Validators.required],
        city: [this.addressData.city,Validators.required],
        pin_code: [this.addressData.pinCode,Validators.required],
        landmark: [this.addressData.landmark, Validators.required],
        state: [this.addressData.state,Validators.required],
      });
    })
    
  }

  onSubmit(){
    this.error = ""
    if (this.form.get('fullname').hasError('required')) {
      this.error = "Please Fill All Fields";
    }else if (this.form.get('house_no').hasError('required')) {
      this.error = "Please Fill All Fields";
    }else if (this.form.get('area').hasError('required')) {
      this.error = "Please Fill All Fields";
    }else if (this.form.get('city').hasError('required')) {
      this.error = "Please Fill All Fields";
    }else if (this.form.get('pin_code').hasError('required')) {
      this.error = "Please Fill All Fields";
    }else if (this.form.get('landmark').hasError('required')) {
      this.error = "Please Fill All Fields";
    }else if (this.form.get('state').hasError('required')) {
      this.error = "Please Fill All Fields";
    }else{
      const userData = {
        addressId: this.addressId,
        fullName: this.form.get('fullname').value,
        houseNumber: this.form.get('house_no').value,
        area: this.form.get('area').value,
        city: this.form.get('city').value,
        pinCode: this.form.get('pin_code').value,
        landmark: this.form.get('landmark').value,
        state: this.form.get('state').value,
        country: "India"
    };
    let resp = this.api_service.updateAddress(userData);
    resp.then((response)=>{
      if(response.message.includes("success")){
        this.notify.proccessSuccessfull("Address Updated Successfully")
        setTimeout(()=>{
          location.reload()
        }, 2000)
      }
    })
    }
  }
}
