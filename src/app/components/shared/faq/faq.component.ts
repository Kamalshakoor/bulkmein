import { Component, HostListener, ElementRef, QueryList, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../navbar/login/login.component';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  answerElements: QueryList<ElementRef>;
  opened_faq_tab:number = 1
  isLogin: boolean = false;
  screenSizeWidth: number;

  constructor(private dialog: MatDialog, private renderer: Renderer2, private el: ElementRef, private router: Router) {
    this.answerElements = new QueryList<ElementRef>();
    var Isauth = sessionStorage.getItem("user_signed_in");
    if (Isauth == "true") { this.isLogin = true; }
    this.screenSizeWidth = window.innerWidth;
  }

  ToggleFaqTab(event: any){
    const clicked_tab = event.target;
    const all_faq_tabs = document.querySelectorAll(".faq")
    all_faq_tabs.forEach(tab=>{
      this.renderer.removeClass(tab, "active-tab")
      this.renderer.removeClass(tab, "tab-active-mobile");
    })
    this.renderer.addClass(clicked_tab, "active-tab")
    if ( this.screenSizeWidth < 600 ) {
      this.renderer.addClass(clicked_tab, "tab-active-mobile");
    }
    this.opened_faq_tab =  parseInt((clicked_tab.classList[1].split("-")[1]))
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.screenSizeWidth = window.innerWidth;
  }

  logincheck() {
    if (this.isLogin != true) {
      this.dialog.open(LoginComponent)
    }
  }
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
}
