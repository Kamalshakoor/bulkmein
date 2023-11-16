import { Injectable } from '@angular/core';
import { environment } from './../../../environment';
import { NotificationService } from '../notification/notification.service';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  user_signed_in:boolean = false
  private apiUrl = environment.apiUrl;

  constructor(private notify: NotificationService, private router: Router){}

  preparePostRequestData(userData:Object, request_method:string):object{
    return {
			method: request_method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		};
  }

  prepareGetRequestData(accessToken:any){
    return {
      method: "GET",
       headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    }
  }

  prepareGetPostPutWithBodyAndToken(accessToken: any, requestMethod: string, requestBody: any){
    return {
      method: requestMethod,
       headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    }
  }

  userSignedIn(){
    return this.user_signed_in
  }

  async isUserLoggedIn(accessToken: any){
    let headers = this.prepareGetRequestData(accessToken)
    try {
      const response = await fetch(`${this.apiUrl}/user/isUserLoggedIn`,headers);
      if(response.status == 200){
        this.user_signed_in = true
      }
      return await response.json();
    } catch (error) {
      this.notify.someThingWentWrong();
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async getProductListForSearch(){
    try {
      const response = await fetch(`${this.apiUrl}/product/getProductListForSearch`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async login(userData: object) {
    const requestOptions = this.preparePostRequestData(userData, "POST")
    try {
      const response = await fetch(`${this.apiUrl}/user/login`, requestOptions);
      if (!response.ok) {
        let err = await response.json();
        this.notify.processNotSuccessfull(err.message)
      }
      return await response.json();
    } catch (error) {
      // console.error('An error occurred:', error);
      // throw error;
    }
  }

	async signup(userData: object){
		const requestOptions = this.preparePostRequestData(userData, "POST")
    try {
      const response = await fetch(`${this.apiUrl}/user/registerNewUser`, requestOptions);
      if (!response.ok) {
        if(response.status == 403){
          let r = await response.json();
          this.notify.processNotSuccessfull(r.message);
        }else{
          this.notify.someThingWentWrong();
        }
      }
      return await response.json();
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
	}

  async VerifyOtpForNonAuthenticatedUser(otp:string, token:any){
    let endpoint = `${environment.apiUrl}/user/verifyOtp?token=${token}&otp=${otp}`
    try {
      const response = await fetch(endpoint);
      if (response.status == 403) {
        this.notify.processNotSuccessfull("Invalid OTP")
      }
      return await response.json();
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async VerifyOTPForNonAuthenticatedForgetPassword(otp:string, token:any){
    let endpoint = `${environment.apiUrl}/user/verifyOtp?token=${token}&otp=${otp}`
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        let r = await response.json();
        let error = ""
        if(r.message != null || r.message != undefined){
          error = r.message
        }else{
          error =r.error
        }
        this.notify.processNotSuccessfull(error);
      }
      return await response.json();
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async createAccount(formData:any){
    console.log("formDataformDataformData", formData)
    const requestOptions = {
			method: 'POST',
			body: formData,
		}
    
    try {
      const response = await fetch(`${this.apiUrl}/signup/registerUser`, requestOptions);
      if (!response.ok) {
        this.notify.someThingWentWrong();
      }
      return await response.json();
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async forgetPasswordForNonAuthenticatedUser(userName:string){
    try {
      const response = await fetch(`${this.apiUrl}/user/forgetPassword?userName=${userName}`);
      if (!response.ok) {
        let r = await response.json();
        this.notify.processNotSuccessfull(r.message);
      }
      return await response.json();
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async resendOtp(token:any, isUserAuthenticated:boolean){
    let headers = null
    let response = null
    if(isUserAuthenticated){
    let accessToken = sessionStorage.getItem("accessToken");
      headers = this.prepareGetRequestData(accessToken);
      response = await fetch(`${this.apiUrl}/user/resendOtpForLoggedInUser?token=${token}`, headers);
    }else{
      response = await fetch(`${this.apiUrl}/user/resendOtp?token=${token}`);
    }
    if(response.ok){
      this.notify.proccessSuccessfull("OTP Sent Successfully")
    }else{
      this.notify.someThingWentWrong();
    }
    console.log(response)
    
  }

  async sendOTPForAuthenticatedUser(){
    let accessToken = sessionStorage.getItem("accessToken");
    let headers = this.prepareGetRequestData(accessToken)
    try {
      const response = await fetch(`${this.apiUrl}/user/generateOtpForLoggedUser`, headers);
      if (!response.ok) {
        let r = await response.json();
        this.notify.processNotSuccessfull(r.message);
      }
      return await response.json();
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async resetPasswordForAuthenticatedUser(userData: any){
    let accessToken = sessionStorage.getItem("accessToken");
    let headers = this.prepareGetPostPutWithBodyAndToken(accessToken, "PUT", userData)
    try {
      const response = await fetch(`${this.apiUrl}/user/resetPasswordForLoggedInCustomer`,headers);
      if(!response.ok){
        let r = await response.json();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: r.message,
          });
      }else if(response.ok){
        Swal.fire(
          'Success!',
          'Password Updated Successfully.',
          'success'
        ).then((swal_response)=>{
          location.reload();
        })
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async resetPasswordForNonAuthenticatedUser(userData: any){
    let headers = this.preparePostRequestData(userData, "PUT")
    try {
      const response = await fetch(`${this.apiUrl}/user/resetPassword`,headers);
      if(!response.ok){
        let r = await response.json();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: r.message,
          }).then((result) => {
            this.router.navigate(["/"])
          });
      }else if(response.ok){
        Swal.fire(
          'Success!',
          'Password Updated Successfully.',
          'success'
        ).then((result)=>{
          this.router.navigate(["/"]);
        })
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async getProductsPageData() {
    try {
      const response = await fetch(`${this.apiUrl}/homepage/getHomePageDetails`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      this.notify.someThingWentWrong();
      console.error('An error occurred:', error);
      throw error;
    }
  }
  
  async getProductSubCatWise(subCatID:number){
    try {
      let accessToken = sessionStorage.getItem("accessToken")
      let response = null;
      if(accessToken !=null || accessToken != undefined){
        const headers = this.prepareGetRequestData(accessToken)
        response = await fetch(`${this.apiUrl}/product/getProductSubCatWise?subCategoryId=${subCatID}`, headers);
      }else{
        response = await fetch(`${this.apiUrl}/product/getProductSubCatWise?subCategoryId=${subCatID}`);
      }
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      this.notify.someThingWentWrong();
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async getProductById(ProductID:number, token:any){
    try {
      let response = null;
      if (token != null) {
        const headers = this.prepareGetRequestData(token)
        response = await fetch(`${this.apiUrl}/product/getProductById?productId=${ProductID}`,headers);
      } else {
        response = await fetch(`${this.apiUrl}/product/getProductById?productId=${ProductID}`);
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      this.notify.someThingWentWrong();
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async getProductByVariationId(variation_id: any){
    try {
      const response = await fetch(`${this.apiUrl}/product/getProductByVariationId?variationId=${variation_id}`);
      return await response.json();
    } catch (error) {
      this.notify.someThingWentWrong();
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async getProductByQuantityVariationId(variation_id: any){
    try {
      const response = await fetch(`${this.apiUrl}/product/getProductByQuantityVariationId?quantityVariationId=${variation_id}`);
      return await response.json();
    } catch (error) {
      this.notify.someThingWentWrong();
      console.error('An error occurred:', error);
      throw error;
    }
  }

  //Cart Based API
  async getCart(){
    let accessToken = sessionStorage.getItem("accessToken")
    let headers = this.prepareGetRequestData(accessToken)
    try {
      const response = await fetch(`${this.apiUrl}/cart/getCartPage`,headers);
      if(response.status == 200){
        this.user_signed_in = true
      }
      return await response.json();
    } catch (error) {
      this.notify.someThingWentWrong();
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async addToCart(userData:any){
    let accessToken = sessionStorage.getItem("accessToken")
    let headers = this.prepareGetPostPutWithBodyAndToken(accessToken, "POST", userData)
    try {
      const response = await fetch(`${this.apiUrl}/cart/addToCart`,headers);
      return await response.json();
    } catch (error) {
      this.notify.someThingWentWrong();
      throw error;
    }
  }

  async UpdateCartItemQuantity(userData:any){
    let accessToken = sessionStorage.getItem("accessToken")
    let headers = this.prepareGetPostPutWithBodyAndToken(accessToken, "PUT", userData)
    try {
      const response = await fetch(`${this.apiUrl}/cart/updateProductsOfCart`,headers);
      if(!response.ok){
        this.notify.someThingWentWrong();
      }
      return await response.json();
    } catch (error) {
      this.notify.someThingWentWrong();
      alert("Something Went Wrong, Plaese Try Again")
      throw error;
    }
  }

  async removeItemFromCart(userData:any){
    let accessToken = sessionStorage.getItem("accessToken")
    let headers = this.prepareGetPostPutWithBodyAndToken(accessToken, "PUT", userData )
    try {
      const response = await fetch(`${this.apiUrl}/cart/deleteProductsFromCart`,headers);
      return await response.json();
    } catch (error) {
      this.notify.someThingWentWrong();
      alert("Something Went Wrong, Plaese Try Again")
      throw error;
    }
  }

  async calculateShippingCost(userData: any){
    let accessToken = sessionStorage.getItem("accessToken")
    let headers = this.prepareGetPostPutWithBodyAndToken(accessToken, "POST", userData)
    try {
      const response = await fetch(`${this.apiUrl}/product/shippingCost`,headers);
      if(!response.ok){
        const errorResponse = await response.json();
        this.notify.processWarning(errorResponse.message);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async PlaceOrder(userData:any){
    let resp = null;
    let accessToken = sessionStorage.getItem("accessToken")
    let headers = this.prepareGetPostPutWithBodyAndToken(accessToken, "POST", userData)
    try {
      const response = await fetch(`${this.apiUrl}/product/buyNow`,headers);
      if(!response.ok){
        const errorResponse = await response.json();
        this.notify.processNotSuccessfull(errorResponse.message);
      }else{
        resp = this.deleteCartProducts();
      }
      return resp;
    } catch (error) {
      throw error;
    }
  }

  async deleteCartProducts(){
    let accessToken = sessionStorage.getItem("accessToken")
    let headers = this.prepareGetPostPutWithBodyAndToken(accessToken, "PUT", {})
    try {
      const response = await fetch(`${this.apiUrl}/cart/deleteAllProductsFromCart`,headers);
      if(!response.ok){
        const errorResponse = await response.json();
        this.notify.processNotSuccessfull(errorResponse.message);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  //Profile Based Apis
  async getAddressByUserId(){
    let accessToken = sessionStorage.getItem("accessToken")
    let headers = this.prepareGetRequestData(accessToken)
    try {
      const response = await fetch(`${this.apiUrl}/address/getAddressByUserId`,headers);
      if(response.status == 200){
        this.user_signed_in = true
      }
      return await response.json();
    } catch (error) {
      this.notify.someThingWentWrong();
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async getAddressById(addressId: number){
    let accessToken = sessionStorage.getItem("accessToken")
    let headers = this.prepareGetRequestData(accessToken)
    try {
      const response = await fetch(`${this.apiUrl}/address/getAddressById?addressId=${addressId}`,headers);
      return await response.json();
    } catch (error) {
      this.notify.someThingWentWrong();
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async addNewAddress(userData: any){
    let accessToken = sessionStorage.getItem("accessToken")
    let headers = this.prepareGetPostPutWithBodyAndToken(accessToken, "POST", userData)
    try {
      const response = await fetch(`${this.apiUrl}/address/addAddress`,headers);
      return await response.json();
    } catch (error) {
      this.notify.someThingWentWrong();
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async updateAddress(userData: any){
    let accessToken = sessionStorage.getItem("accessToken")
    let headers = this.prepareGetPostPutWithBodyAndToken(accessToken, "PUT", userData)
    try {
      const response = await fetch(`${this.apiUrl}/address/updateAddress`,headers);
      return await response.json();
    } catch (error) {
      this.notify.someThingWentWrong();
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async deleteAddressbyId(address:number){
    let accessToken = sessionStorage.getItem("accessToken")
    try {
      const response = await fetch(`${this.apiUrl}/address/deleteAddressById?addressId=${address}`,
       {
        method: "DELETE",
         headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      }
      );
      return await response.json();
    } catch (error) {
      this.notify.someThingWentWrong();
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async savedOrders(){
    let accessToken = sessionStorage.getItem("accessToken")
    let headers = this.prepareGetRequestData(accessToken)
    try {
      const response = await fetch(`${this.apiUrl}/product/yourOrder`,headers);
      if(response.status == 200){
        this.user_signed_in = true
      }
      return await response.json();
    } catch (error) {
      this.notify.someThingWentWrong();
      console.error('An error occurred:', error);
      throw error;
    }
  }
}
