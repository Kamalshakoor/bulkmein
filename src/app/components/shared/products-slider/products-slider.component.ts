import { Component, HostListener, Renderer2 } from '@angular/core';
import { toArray } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-products-slider',
  templateUrl: './products-slider.component.html',
  styleUrls: ['./products-slider.component.css']
})
export class ProductsSliderComponent {
  screenSizeWidth: number;
  slider_items:{
    superCategory: string,
    products: any[]
  }[]= []

  products:{
    productId: number,
    productName: string,
    price: number,
    previewImageS3url: string
  }[] = [];
  user_signed_in = sessionStorage.getItem("user_signed_in") || ""
  tab_checked:boolean = false

  constructor(private renderer: Renderer2, private api_service: ApiService) {
    this.screenSizeWidth = window.innerWidth;
  };

  ngOnInit(){
    const cat_resp = this.api_service.getProductsPageData();
    cat_resp.then((response)=>{
      const listings = response.listing
      listings.forEach((listing:any)=>{
        let products:any[] = []
        listing.subCategory.forEach((subcat:any)=>{
          let prod_resp = this.api_service.getProductSubCatWise(subcat.subCategoryId);
          prod_resp.then((product_response)=>{
            product_response.forEach((product:any)=>{
              products.push(product)
            })
          })
        })
        this.slider_items.push(
          {
            superCategory: listing.superCategoryName,
            products: products
          }
        )
      })

      this.products = this.slider_items[0].products
    })
  }

  happycustomerMobile: OwlOptions = {
    loop: true,
    nav: false,
    dots: true,
    responsive: {
      376: {
        items: 1, // Configure for screen width between 576px and 768px
      },
      768: {
        items: 2, // Configure for screen width between 768px and 992px
      },
      992: {
        items: 3, // Configure for screen width between 992px and 1200px
      },
      1200: {
        items: 3, // Configure for screen width 1200px and above
      },
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.screenSizeWidth = window.innerWidth;
  }

  changeActiveTab(event: any){
    const clickedTab = event.target;
    const allTabs = document.querySelectorAll(".tab-a");
    allTabs.forEach(tab=>{
      if (tab.classList.contains('active-tab')) {
        this.renderer.removeClass(tab, 'active-tab');
        this.renderer.removeClass(tab, 'active-tab-mobile');
      }
    })
    
    let id = parseInt(clickedTab.id)
    this.products = this.slider_items[id].products
    this.renderer.addClass(clickedTab, "active-tab")
    if ( this.screenSizeWidth < 600 ) {
      this.renderer.addClass(clickedTab, 'active-tab-mobile');
    }
  }

}
