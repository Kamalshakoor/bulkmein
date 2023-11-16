import { Component, Renderer2, HostListener } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  is_user_logged_in:boolean = false
  screenWidth:number;

  super_categories:{spCatName:string, spCatidx: number}[] = []
  data: { superCategoryId: any, superCategoryName: any[], subCategories: any[] }[] = [];
  ModifiedSuperSubCategories: {
    superCategoryName: any;
    superCategoryId: any;
    subCategories: any[];
  }[] = [];
  all_data:{superCatID:number, superCatName:string, subCategories:[]}[] = []
  tab_checked: boolean = false

  constructor(private renderer: Renderer2, private api_service: ApiService){
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(){
    this.data = [];
    const tabbed_window = document.querySelector(".tabbed-window");
    const resp = this.api_service.getProductsPageData();
    resp.then(response=>{
      response.listing.forEach((listing:any,index:number)=>{
        let superCategoryName = listing.superCategoryName;
        let superCategoryId = index
        let subcategories = listing.subCategory;
        let ModifiedSubCategories: {
          subCategoryId: any;
          subCategoryName: any;
          products: any[];
        }[] = [];
        subcategories.forEach((subcat:any)=>{
          let subcategoryData = {
            subCategoryId: subcat.subCategoryId,
            subCategoryName: subcat.name,
            products:[]
          }
          let subCategoryId = subcat.subCategoryId
          const products_resp = this.api_service.getProductSubCatWise(subCategoryId)
          products_resp.then((products:any)=>{
            subcategoryData.products = products;
          })
          ModifiedSubCategories.push(subcategoryData)
        })
        this.ModifiedSuperSubCategories.push({
          superCategoryName: superCategoryName,
          superCategoryId: superCategoryId,
          subCategories: ModifiedSubCategories
        })

      })
      this.ModifiedSuperSubCategories.forEach((cat_obj:any,idx:any)=>{
        this.super_categories.push({
          spCatName: cat_obj.superCategoryName,
          spCatidx: idx
        })
      })

      this.data.push(this.ModifiedSuperSubCategories[0])
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.screenWidth = window.innerWidth;
  }

  ngAfterViewInit(){
    const tabbed_window = document.querySelector(".tabbed-window");
    let user_signed_in = sessionStorage.getItem("user_signed_in")
    if(user_signed_in == "true"){
      this.is_user_logged_in = true
    }
  }

  addToCart(product_id: any){
    console.log(product_id)
  }
  
  toggleAndFetchProducts(event: any){
    this.tab_checked = true
    this.data = []
    const all_product_tabs = document.querySelectorAll(".tab-prod");
    let clicked_tab = event.target;
    console.log(clicked_tab)
    all_product_tabs.forEach(tab=>{
      this.renderer.removeClass(tab,"active-tab");
      this.renderer.removeClass(tab,"active-tab-mobile");
    })
    this.renderer.addClass(clicked_tab, "active-tab");
    if ( this.screenWidth < 600 ) {
    this.renderer.addClass(clicked_tab, "active-tab-mobile");
    }
    let spCatId = event.target.getAttribute("data_spCatId");
    this.ModifiedSuperSubCategories.forEach((supersubcat:any)=>{
      if(supersubcat.superCategoryId == spCatId){
        this.data.push(supersubcat)
      }
    })
  }
}
