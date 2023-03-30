import { Component } from '@angular/core';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
    faLocationDot=faLocationDot;
    faHouse=faHouse;
    faTwitter=faTwitter;
    faTiktok=faTiktok;
    faInstagram=faInstagram;
    faFacebook=faFacebook;
    currentPage:number=0;

    

    changePage(){
      const overlay : HTMLDivElement= document.querySelector('.overlay');
      const localPage: HTMLDivElement= document.querySelector('.grid-container');
      const pages=[overlay,localPage]
      this.currentPage = this.currentPage===0 ? 1:0;
      pages.forEach((page, index)=>{
        console.log(overlay)
        console.log(localPage)
        console.log("We are changing translate to:!",(index-this.currentPage)* 1200)
        page.style.transform=`translateY(${(index-this.currentPage)* 1200}px)`
      })
    }


}
