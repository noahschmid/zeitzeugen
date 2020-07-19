import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.addEventListener('DOMContentLoaded', (event)=> {
      if(document.documentElement.clientWidth > 450) {
        let wrapper = document.getElementById("wrapper");
        wrapper.style.width = "450px";
        wrapper.style.height = "auto";
        wrapper.style.marginLeft = "auto";
        wrapper.style.marginRight = "auto";
        wrapper.style.borderLeft = "0px solid black";
        wrapper.style.borderRight = "0px solid black";
      }
    });
  }

}
