import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toaster: ToastrService) {}
  someThingWentWrong() {
    this.toaster.error('Something Went Wrong. Please Try Again');
  }

  proccessSuccessfull(msg: string){
    this.toaster.success(msg);
  }

  processWarning(msg:string){
    this.toaster.warning(msg)
  }

  proccessInfo(msg:string){
    this.toaster.info(msg)
  }

  processNotSuccessfull(msg: string){
    this.toaster.error(msg)
  }

  loginSuccessfull(){
    this.toaster.success("Login Successfull")
  }

  invalidLogin(msg:string){
    this.toaster.error(msg)
  }
}
