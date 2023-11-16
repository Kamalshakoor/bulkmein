import { Component, HostListener, Renderer2 } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/components/navbar/login/login.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  data:any = []
  product_id:number = 0
  logged_in: boolean = false
  screenWidth:number;
  tab = 1;

  constructor(private renderer: Renderer2, private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private api_service: ApiService, private notify: NotificationService) {
    this.screenWidth = window.innerWidth
  };
  min = 10;
  max = 100;
  interval = 10;

  getRange(): number[] {
    const range = [];
    for (let index = this.min; index <= this.max; index += this.interval) {
      range.push(index);
    }
    return range;
  }
  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      if (queryParams.has('product_id')) {
        const productId = Number(queryParams.get('product_id'));
        if(isNaN(productId) || productId == 0){
          this.router.navigate(['/products']);
        }else{
          this.product_id = productId;
          this.fetchAndLoad();
        }
      } else {
        this.router.navigate(['/products']);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.screenWidth = window.innerWidth
  }

  fetchAndLoad(){
    const accessToken = sessionStorage.getItem("accessToken")
    let token = null;
    if (accessToken == null || accessToken == undefined) {
      token = null
      this.logged_in = false
    } else {
      token = accessToken
      this.logged_in = true
    }

    const product_details_resp = this.api_service.getProductById(this.product_id, token)
    product_details_resp.then((response:any)=>{
      this.data = response
      this.min = response.minimumQuantity
      this.max = response.maxQuantity
      this.interval = response.quantityInterval
    })
  }

  addToCart(quantity_select_box: any){
    let user_signed_in = sessionStorage.getItem("user_signed_in")
    if(user_signed_in == null || user_signed_in == undefined){
      this.screenWidth > 600 ? this.dialog.open(LoginComponent) : this.router.navigate(["/login"])
      this.notify.processNotSuccessfull("You Need to Login First")
    } else {
      const select_box = quantity_select_box as HTMLSelectElement;
      let quantity = parseInt(select_box.value)
      if (isNaN(quantity)) {
        this.notify.processNotSuccessfull("Please Select Quantity")
      } else {
        let userData = {
          fkProductId: this.product_id,
          quantity: quantity
        }
  
        let resp = this.api_service.addToCart(userData);
        resp.then((response)=>{
          if(response.cartCount != undefined || response.cartCount!= null){
            this.notify.proccessSuccessfull("Product Added to cart Successfully")
            setTimeout(()=>{
              location.reload();
            }, 1000)
          }
        })
      }
    }
  }

  changeActiveImage(event: any) {
    const active_image = document.querySelector(".img-active") as HTMLImageElement | null;
    if (active_image) {
      active_image.src = event.target.src;
    } else {
      console.error("Element with class 'img-active' not found.");
    }
  }

  getProductByVariationId(event:any){
    const variation_id = event.target.value;
    if ( variation_id != "Quality" ) {
      const resp = this.api_service.getProductByVariationId(variation_id);
      resp.then((response)=>{
        if (response.productId != null || response.productId != undefined){
          location.href=`product-details?product_id=${response.productId}`
        }
      })
    }
  }

  getProductByQuantityVariationId(event:any){
    const variation_id = event.target.value;
    if ( variation_id != "Quality" ) {
      const resp = this.api_service.getProductByQuantityVariationId(variation_id);
      resp.then((response)=>{
        if (response.productId != null || response.productId != undefined){
          location.href=`product-details?product_id=${response.productId}`
        }
      })
    }
  }


  changeActiveTab(event: any){
    const clickedTab = event.target;
    const allTabs = document.querySelectorAll(".tab-a");
    allTabs.forEach(tab=>{
      if (tab.classList.contains('active-tab')) {
        this.renderer.removeClass(tab, 'active-tab');
      }
    })
    
    let id = parseInt(clickedTab.id)
    if (id == 1) {
      this.tab = 1;
      
    }if (id == 2) {
      this.tab = 2
    } 
    if (id == 3) {
      this.tab = 3
    } 
    if (id == 4) {
      this.tab = 4
    } 

    this.renderer.addClass(clickedTab, "active-tab")
    event.preventDefault();
  }
}
