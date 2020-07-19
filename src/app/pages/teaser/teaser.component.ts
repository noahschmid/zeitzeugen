import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-teaser',
  templateUrl: './teaser.component.html',
  styleUrls: ['./teaser.component.scss']
})
export class TeaserComponent implements OnInit {
  backIcon = faArrowLeft;
  constructor() { }

  ngOnInit(): void {
  }

}
