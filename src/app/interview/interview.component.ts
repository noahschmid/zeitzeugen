import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faHandHoldingWater } from '@fortawesome/free-solid-svg-icons';
import {Howl, Howler, Track} from 'howler';
import { HttpDownloadProgressEvent } from '@angular/common/http';

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
  filename = "";

  file: Track = { name: 'Interview', path:'../../../assets/audio/interview_pius.mp3'};
  player;
  playing:boolean = false;

  ngOnInit(): void {
    this.height = document.documentElement.clientHeight;
    this.width = document.documentElement.clientWidth;
    this.filename = "../../../assets/audio/interview_pius.mp3";
    this.player = new Howl({
      src:[this.filename]
    });
  }


  play() {
    this.playing = !this.playing;

    if(this.playing)
      this.player.play();
    else
      this.player.pause();
  }

  pause() {
    this.player.pause();
  }

  togglePlayer(pause) {

  }

}
