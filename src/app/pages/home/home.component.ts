import { Component, HostListener, ElementRef, QueryList, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Breakpoints } from '@angular/cdk/layout';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../../components/navbar/login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  isLogin: boolean = false;
  addclass: any;
  screenWidth: number;
  isDesktopView: boolean = true;
  carousel_data: { heading: string; slogan: string, selector: string, imgsrc: string; }[] = [];
  UniqueSecData: { icon: string; subtext: string }[] = [];
  happyCustomerData: { R_content: string; logo: any; rating: number,clientname:string,clientdest:string }[] = [];
  answerElements: QueryList<ElementRef>;

  constructor(private dialog: MatDialog, private renderer: Renderer2, private el: ElementRef, private api_service: ApiService, private router: Router) {
    this.screenWidth = window.innerWidth;
    var Isauth = sessionStorage.getItem("user_signed_in");
    if (Isauth == "true") { this.isLogin = true; }
    this.answerElements = new QueryList<ElementRef>();
    this.happyCustomerData = [
      {
        R_content: "I don't have to call 10 times for checking market rates for chia, Bulkmein provide daily updates on latest price.",
        logo: "assets/tata.png",
        rating: 5,
        clientname: "Anukush",
        clientdest:"Tata"
      },
      {
        R_content: "Bulkmein provides the best quality superfoods and on time delivery, we are very happy with the service.",
        logo: "assets/chai-point.png",
        rating: 5,
        clientname: "Manju",
        clientdest: "Chai Point"
      },
      {
        R_content: "We used to have lots of rejection due to quality issue, Bulkmein provided best quality with right prices.",
        logo: "assets/swiggy.png",
        rating: 5,
        clientname: "Gopal",
        clientdest: "Swiggy"
      },
      {
        R_content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam a eveniet non magnam",
        logo: "assets/swiggy.png",
        rating: 5,
        clientname: "Gopal",
        clientdest: "Swiggy"
      }
    ]
    this.UniqueSecData = [
      {
        icon: "assets/setting.png",
        subtext: "8 layer <br> Quality Checks"
      },
      {
        icon: "assets/pin.png",
        subtext: "Market <br> Value"
      },
      {
        icon: "assets/truck.png",
        subtext: "Full Control <br> Over Delivery"
      },
      {
        icon: "assets/calendar.png",
        subtext: "Guaranteed Replacement"
      },
      {
        icon: "assets/setting.png",
        subtext: "Year Round Availability"
      }
    ]

    this.carousel_data = [
      {
        heading: "Bulk Superfoods, Premium Quality",
        slogan: "Superfoods Solution: B2B Platform for all your needs.",
        selector: "second_slide",
        imgsrc: "assets/Banner2.jpg"

      },
      {
        heading: "Largest Superfood Marketplace",
        slogan: "Get contract pricing your round for your bulk orders.",
        selector: "first_slide",
        imgsrc:"assets/Banner3.jpg"
      },

      {
        heading: "Always Stay Updated With Alerts",
        slogan: "Get pricing alerts and order updates at the palm of your hand!",
        selector: "third_slide",
        imgsrc: "assets/Banner4.jpg"
      }
    ]
  }

  products = [
    {
      product_name: "Quinoa",
      product_img: "assets/p1.png",
      product_price: 100
    },
    {
      product_name: "Quinoa",
      product_img: "assets/p2.png",
      product_price: 110
    },
    {
      product_name: "Quinoa",
      product_img: "assets/p3.png",
      product_price: 90
    },
    {
      product_name: "Quinoa",
      product_img: "assets/p4.png",
      product_price: 85
    },
  ]


  ToggleFaq(event: any) {
    const targetElement = event.target;
    const clicked_answer = `.answer__${targetElement.classList[0].split("-")[1]}`;
    const answer = document.querySelector(clicked_answer);

    if (targetElement.classList.contains('open')) {
      this.renderer.removeClass(targetElement, 'open');
      this.renderer.removeClass(targetElement, 'fa-minus');
      this.renderer.addClass(targetElement, 'fa-plus');
      this.renderer.addClass(answer,"hidden")
    } else {
      this.renderer.removeClass(targetElement, 'fa-plus');
      this.renderer.addClass(targetElement, 'fa-minus');
      this.renderer.addClass(targetElement, 'open');
      this.renderer.removeClass(answer,"hidden")
    }

  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    items:1
  }

  UniqueSec: OwlOptions = {
    items: 1,
    loop: true,
    nav: false,
    dots: true
  }
  happycustomer: OwlOptions = {
    loop: true,
    nav: true,
    navText: ['<', '>'],
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


  logincheck() {
    if (this.isLogin == true) {
      this.router.navigateByUrl('products');
    } else {
      this.dialog.open(LoginComponent)
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.screenWidth = window.innerWidth;
  }
  ngOnInit() {
    console.log('Handset ' + Breakpoints.Handset);
    if (window.innerWidth < 658) {
      this.addclass = true
      //alert("hgjk")
    } else {
      this.addclass = false
    }
    this.checkViewport();
    window.addEventListener('resize', this.checkViewport);
  }
  ngOnDestroy() {
    window.removeEventListener('resize', this.checkViewport);
  }
  checkViewport() {
    this.isDesktopView = window.innerWidth >= 768; // Change this breakpoint as needed
  }
}
