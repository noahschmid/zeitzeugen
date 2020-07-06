import { Injectable, OnInit } from '@angular/core';
import { Marker, LockedMarker } from 'src/app/models/marker';
import { Speaker } from 'src/app/models/speaker';
import { $ } from 'protractor';
import { GeneratorService } from '../generator/generator.service';
import { timeStamp } from 'console';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  private markerList:Array<Marker> = [];
  private ulock : string = "";

  constructor(private generatorService : GeneratorService) { 
    const dim = {x:0, y:0, width:0, height:0};

    if(localStorage.getItem("ulock") != null)
      this.ulock = localStorage.getItem("ulock");

    fetch('../../../assets/json/data.json')
    .then(response => response.json())
    .then(json => {
      for(let m of json) {
        let s = new Speaker(m.speaker.firstName, m.speaker.lastName, m.speaker.action, m.speaker.profession, m.speaker.age);
        this.markerList.push(new Marker(m.x, m.y, this.markerList.length, dim, s));
        this.unlockItems();
      }
    }).catch(err => {
      console.log(err);
    });
  }

  unlockItems() {
    if(this.ulock.length == 0 || this.ulock.indexOf(";") == -1)
      return;

    let codes = this.ulock.split(";");
    for(let c in codes) {
      this.activateCode(codes[c]);
    }
  }

  getMarker(id): Marker {
    let marker = this.get(id);
    if(marker == null)
      return null;

    if(marker.unlocked) {
      return marker;
    }

    return new LockedMarker(marker.id);
  }

  getMarkers(): Array<Marker> {
    return this.markerList;
  }

  addMarker(marker:Marker) {
    marker.id = this.markerList.length;
    this.markerList.push(marker);
  }

  updatePosition(mapDim) {
    for(let m of this.markerList) {
      m.updatePosition(mapDim);
    }
  }

  get(id) {
    for(let i of this.markerList) {
      if(i.id == id) {
        return i;
      }
    }
    return null;
  }

  unlock(id, unlocked) {
    if(this.get(id) == null)
      return;
    this.get(id).unlocked = unlocked;
    this.ulock += this.ulock.length == 0 ? this.generatorService.encode(id) : ";" + this.generatorService.encode(id);
    localStorage.setItem("ulock", this.ulock);
  }

  activateCode(code) {
    this.unlock(this.generatorService.decode(code), true);
  }
}
