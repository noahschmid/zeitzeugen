import { Component, OnInit, OnDestroy } from '@angular/core';
import { faArrowLeft, faHandHoldingWater, faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import { Howl, Howler, Track } from 'howler';
import { HttpDownloadProgressEvent } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Marker } from 'src/app/models/marker';
import { MarkerService } from 'src/app/services/marker-service/marker.service';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute,
    private markerService: MarkerService) { }

  backIcon = faArrowLeft;
  playIcon = faPlayCircle;
  pauseIcon = faPauseCircle;
  height = 0;
  width = 0;
  filename = "";

  file: Track = { name: 'Interview', path:'../../../assets/audio/interview_pius.mp3'};
  player;
  playing:boolean = false;
  loaded:boolean = false;

  sub;
  marker:Marker;

  locked: boolean = true;
  ulock;
  id;
  
  color:ThemePalette = 'primary';

  ngOnInit(): void {
    this.sub = this.activatedRoute
      .queryParams
      .subscribe(params => {
        this.markerService.getStatus().subscribe(loaded => {
          if(loaded) {
            if(params['ulock'] != null) 
              this.markerService.activateCode(params['ulock'].toUpperCase());

            this.marker = this.markerService.getMarker(+params['id']);

            if(this.marker == null)
              return;
            
            this.locked = !this.marker.unlocked;
            this.loaded = true;
          }
        });  
      });
    this.height = document.documentElement.clientHeight;
    this.width = document.documentElement.clientWidth;
  }
}
