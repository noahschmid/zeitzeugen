import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import { Marker } from 'src/app/models/marker';
import { ThemePalette } from '@angular/material/core';
import {Howl, Howler, Track} from 'howler';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent { //implements OnInit, OnDestroy {
  constructor() { }
  
  playIcon = faPlayCircle;
  pauseIcon = faPauseCircle;
  height = 0;
  width = 0;
  @Input()
  filename:string = "";

  loading = false;
  firstAccess = true;

  file: Track = { name: 'Interview', path:'../../../assets/audio/' + this.filename};
  player;
  playing:boolean = false;
  
  ngOnInit(): void {
    document.documentElement.style.setProperty("--progress-width", "100%");
    document.documentElement.style.setProperty("--progress-left", "0px");

    this.player = new Howl({
      src:["../../../assets/audio/" + this.filename],
      preload: true,
      html5:true,
      onload:() => {
        this.loading = false;
      }
    });

    setInterval(x => {
      this.updateProgressbar();
    }, 100);
    this.height = document.documentElement.clientHeight;
    this.width = document.documentElement.clientWidth;
  }

  ngOnDestroy(): void {
    this.player.stop();
    this.player = null;
  }

  play() {
    if(this.player == null)
      return;

    this.playing = !this.playing;
    this.firstAccess = false;

    if(this.playing) {
      this.player.play();
      this.updateProgressbar();
    } else {
      this.player.pause();
    }
  }

  jumpTo(event) {
    let progressbar = document.getElementById("progressbar-bg");
    if(progressbar == null)
      return;
    let relPos = (event.x - progressbar.getBoundingClientRect().left) / progressbar.getBoundingClientRect().width;
    let pos = this.player.duration() * relPos;
    this.player.seek(pos);
    this.updateProgressbar();
  }

  updateProgressbar() {
    let progressbar = document.getElementById("progressbar");

      if(progressbar == null)
        return;
      let size = document.getElementById("progressbar-bg").getBoundingClientRect();

      if(progressbar != null) {
          let offset = this.getPosition() * 0.01 * size.width;
          let overlayStyle = window.getComputedStyle(progressbar, 'after');
          progressbar.style.setProperty("--progress-width", (size.width - offset) + "px");
          progressbar.style.setProperty("--progress-left", offset + 'px');
      }
  }

  getPosition() {
    if(this.player == null || this.firstAccess)
      return 0;

    return Math.round(10000*(this.player.seek() / this.player.duration())) / 100;
  }
}
