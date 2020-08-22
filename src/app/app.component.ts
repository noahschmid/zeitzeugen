import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { MarkerService } from './services/marker-service/marker.service';
import { Router, NavigationEnd } from '@angular/router';


declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'zeitzeugen';
  mobile = false;

  constructor(private markerService: MarkerService,
    private elementRef: ElementRef,
    private router: Router) {
    if(document.documentElement.clientWidth < 450) {
      this.mobile = true;
    }

    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
          gtag('config', 'UA-175439830-1', 
                {
                  'page_path': event.urlAfterRedirects
                }
               );
       }
    });
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#1A181B';
 }
}
