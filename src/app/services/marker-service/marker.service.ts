import { Injectable, OnInit } from '@angular/core';
import { Marker } from 'src/app/models/marker';
import { Speaker } from 'src/app/models/speaker';
import { $ } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  private markerList:Array<Marker> = [];

  constructor() { 
    const dim = {x:0, y:0, width:0, height:0};
    fetch('../../../assets/json/data.json')
    .then(response => response.json())
    .then(json => {
      for(let m of json) {
        let s = new Speaker(m.speaker.firstName, m.speaker.lastName, m.speaker.action, m.speaker.profession, m.speaker.age);
        this.markerList.push(new Marker(m.x, m.y, this.markerList.length, dim, s));
      }
    }).catch(err => {
      console.log(err);
    });
  }

  getMarker(id): Marker {
    for(let i of this.markerList) {
      if(i.id == id) {
        return i;
      }
    }
    return null;
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

  unlock(id, unlocked) {
    this.getMarker(id).unlocked = unlocked;
  }
}
