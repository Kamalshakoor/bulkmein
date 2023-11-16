import { Component } from '@angular/core';

// @ts-ignore
// window['$'] = window['jQuery'] = $;


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent{
  slides = [
    {img: "assets/animal/cat1.jpg"},
    {img: "assets/animal/cat2.jpg"},
    {img: "assets/animal/cat3.jpg"},
    {img: "assets/animal/cat4.jpg"},
    {img: "assets/animal/cat5.jpg"},
    {img: "assets/animal/cat6.jpg"},
    {img: "assets/animal/cat7.jpg"},
    {img: "assets/animal/cat8.jpg"},
  ]
  slideConfig = {
    "slidesToShow": 4
  }


}
