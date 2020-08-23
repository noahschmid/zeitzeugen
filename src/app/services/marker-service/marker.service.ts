import { Injectable, OnInit } from '@angular/core';
import { Marker, LockedMarker } from 'src/app/models/marker';
import { Speaker } from 'src/app/models/speaker';
import { $ } from 'protractor';
import { GeneratorService } from '../generator/generator.service';
import { timeStamp } from 'console';
import { Observable, Subject, of, Subscriber, BehaviorSubject } from 'rxjs';
import{GoogleAnalyticsService} from '../../services/google-analytics/google-analytics.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  private markerList:Array<Marker> = [];
  private ulock = { items:[] };

  public loaded = false;
  private hasFinishedLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private bonusMarker : Marker;
  private bounds;
  private mapDim;

  getStatus(): Observable<boolean> {
    return this.hasFinishedLoading.asObservable();
  }

  constructor(private generatorService : GeneratorService,
    private googleAnalyticsService : GoogleAnalyticsService) { 
    const dim = {x:0, y:0, width:0, height:0};

    if(localStorage.getItem("ulock") != null)
      this.ulock = JSON.parse(localStorage.getItem("ulock"));

    fetch('../../../assets/json/data.json')
    .then(response => response.json())
    .then(json => {
      for(let m of json) {
        let s = new Speaker(m.speaker.firstName, m.speaker.lastName, m.speaker.description, m.speaker.age);
        let marker = new Marker(m.x, m.y, this.markerList.length, s, m.filename);
        
        if((m.bonus as any) == true) 
          this.bonusMarker = marker;
        else
          this.markerList.push(marker);

        if(this.markerList.length == 0) {
          for(let i = 0; i < this.markerList.length; ++i) {
            this.ulock.items.push(false);
          }
        }
      }

      this.unlockItems();
      this.loaded = true;
      this.hasFinishedLoading.next(true);
    }).catch(err => {
      console.log(err);
    });
  }

  deleteMarker(id: number) {
    for(let i of this.markerList) {
      if(i.id > id) {
        i.id--;
      }
    }
    this.markerList.splice(id, 1);
  }

  setBounds(bounds) {
    this.bounds = bounds;
    for(let i of this.markerList) {
      i.setBounds(this.bounds);
    }
  }

  isLoaded() { return this.loaded; }

  unlockItems() {
    if(this.ulock.items.length == 0)
      return;

    for(let c in this.ulock.items) {
      if(this.markerList[c] != undefined)
        this.markerList[c].unlocked = this.ulock.items[c];
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
    return this.markerList.filter(m => m.x != 0 && m.y != 0);
  }

  addMarker(marker:Marker) {
    marker.id = this.markerList.length;
    marker.setBounds(this.bounds);
    this.markerList.push(marker);
    console.log((marker.id + 1) + " -> " + marker.x + " " + marker.y);
  }

  get(id) {
    if(id == -1 && this.allUnlocked())
      return this.bonusMarker;

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
    this.ulock.items[id] = unlocked;
    localStorage.setItem("ulock", JSON.stringify(this.ulock));

    if(id != -1)
      this.googleAnalyticsService.eventEmitter("unlock_interview", "interview_" + id, "unlock");
    else
      this.googleAnalyticsService.eventEmitter("unlock_interview", "bonus_interview", "unlock");
  }

  activateCode(code) {
    this.unlock(this.generatorService.decode(code), true);
    this.googleAnalyticsService.eventEmitter("codes", code, "code activated");
  }

  prettyPrintMarkers() : string {
    let prettyString = "[ \n";
    for(let i = 0; i < this.markerList.length; ++i) {
      prettyString += this.markerList[i].prettyPrint();
      if(i != this.markerList.length - 1)
        prettyString += ", \n";
    }

    prettyString += "]";
    return prettyString;
  }

  allUnlocked() : boolean{
    for(let i of this.markerList) {
      if(!i.unlocked) {
        return false;
      }
    }

    return true;
  }
}
