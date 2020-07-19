import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { MarkerService } from './services/marker-service/marker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'zeitzeugen';
  mobile = false;

  constructor(private markerService: MarkerService,
    private elementRef: ElementRef) {
    if(document.documentElement.clientWidth < 450) {
      this.mobile = true;
    }
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#1A181B';
 }
  
}
