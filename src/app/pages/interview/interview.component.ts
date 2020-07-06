import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faHandHoldingWater } from '@fortawesome/free-solid-svg-icons';
import {Howl, Howler, Track} from 'howler';
import { HttpDownloadProgressEvent } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Marker } from 'src/app/models/marker';
import { MarkerService } from 'src/app/services/marker-service/marker.service';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute,
    private markerService: MarkerService) { }

  backIcon = faArrowLeft;
  height = 0;
  width = 0;
  filename = "";

  file: Track = { name: 'Interview', path:'../../../assets/audio/interview_pius.mp3'};
  player;
  playing:boolean = false;

  sub;
  marker:Marker;

  locked: boolean = true;

  ngOnInit(): void {
    this.sub = this.activatedRoute
      .queryParams
      .subscribe(params => {
        console.log(+params['id']);

        if(+params['ulock'] != null) {
          this.markerService.activateCode(+params['ulock']);
        }

        this.marker = this.markerService.getMarker(+params['id']);

        if(this.marker == null)
          return;
        this.player = new Howl({
          src:["../../../assets/audio/" + this.marker.filename]
        });

        this.locked = false;
      });
    this.height = document.documentElement.clientHeight;
    this.width = document.documentElement.clientWidth;
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
