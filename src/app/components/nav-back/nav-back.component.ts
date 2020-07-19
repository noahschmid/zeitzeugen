import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-back',
  templateUrl: './nav-back.component.html',
  styleUrls: ['./nav-back.component.scss']
})
export class NavBackComponent implements OnInit {
  backIcon = faArrowLeft;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigate(["/map"]);
  }
}
