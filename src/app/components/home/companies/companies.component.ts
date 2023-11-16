import { Component, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements AfterViewInit{
  constructor(private el: ElementRef){ }

  ngAfterViewInit() {
    const copy = this.el.nativeElement.querySelector('.logos-slide').cloneNode(true);
    this.el.nativeElement.querySelector('.logos').appendChild(copy);
  }
}
