import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-button',
  templateUrl: './scroll-button.component.html',
  styleUrls: ['./scroll-button.component.scss']
})
export class ScrollButtonComponent {
isScrolled: boolean = false;

scrollToTop(): void {
    window.scroll({ 
           top: 0, 
           left: 0, 
           behavior: 'smooth' 
    });
  }

  @HostListener("window:scroll", [])
    onWindowScroll() {
        this.isScrolled = window.scrollY > 65;
    }

}
