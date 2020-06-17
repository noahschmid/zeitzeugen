import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit {

  constructor() { }

  backIcon = faArrowLeft;
  height = 0;
  width = 0;

  ngOnInit(): void {
    this.height = document.documentElement.clientHeight;
    this.width = document.documentElement.clientWidth;
  }

}
