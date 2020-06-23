import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Marker } from '../../models/marker';
import { DialogService } from 'primeng/dynamicdialog';
import { CodeInputComponent } from '../code-input/code-input.component';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  MessageService
} from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers:[DialogService, MessageService]
})
export class MapComponent implements OnInit {

  constructor(private dialogService: DialogService,
    private dialog: MatDialog,
    private router: Router) { }

  markerList: Marker[] = [];

  editMode: boolean = true;
  width;
  height;
  mapDim;
  windowDim;

  @ViewChild('mapContent', { read: ElementRef }) public mapContent: ElementRef<any>;

  ngOnInit(): void {
    this.windowDim = {w:document.documentElement.clientWidth, h:document.documentElement.clientHeight };
    let map = document.getElementById("map");

    setTimeout(() => {
      document.getElementById("loading").style.display = "none";
      this.mapDim = map.getBoundingClientRect();
      console.log(this.mapDim);

      let marker = new Marker(0.43589266440879826, 0.678125, 0, this.mapDim);
      marker.unlocked = false;
      this.markerList.push(marker);
      this.updateDimension();

      if(this.mapDim.width > this.windowDim.w) {
        console.log("map bigger than screen. centering..");
        let scrollAmt = (this.mapDim.width  - this.windowDim.w)/2;
        console.log(scrollAmt);
        this.mapContent.nativeElement.scrollTo({ left: (this.mapContent.nativeElement.scrollLeft + scrollAmt), behavior: 'auto' });
      }      
    }, 200);
  }

  setMarker(event): void {
    if(!this.editMode || event.x < this.mapDim.x || event.x > this.mapDim.x + this.mapDim.width)
      return;

    let markerDim = document.documentElement.clientHeight * 0.05;

    let normalized = {x:(event.x - this.mapDim.x) / this.mapDim.width, y:(event.y - this.mapDim.y) / this.mapDim.height};
    console.log(event.x + " " + event.y);
    console.log(normalized.x + " " + normalized.y);
    let newMarker = new Marker(normalized.x, normalized.y, 0, this.mapDim);
    this.markerList.push(newMarker);
    console.log(newMarker.left + " " + newMarker.top);
  }

  onClickMarker(id): void {
    let marker = this.getMarker(id);

    console.log(marker);
    if(marker.unlocked) {
      this.router.navigate(["/interview"]);
    } else {
      const ref = this.dialog.open(CodeInputComponent, {
        data:this.getMarker(id)
      });

      ref.afterClosed().subscribe(unlocked => {
        this.getMarker(id).unlocked = unlocked;
      })
    }
  }

  onResize(event) {
    this.windowDim = {w:event.target.innerWidth, h:event.target.innerHeight}
    this.updateDimension();
  }

  updateDimension() {
    this.mapDim = document.getElementById("map").getBoundingClientRect();
    let infoIcon = document.getElementById("info");
    let scannerIcon = document.getElementById("scanner");
    infoIcon.style.left = (this.mapDim.x + this.windowDim.w*0.05) + "px";
    scannerIcon.style.left = (this.windowDim.w - this.windowDim.w*0.20) + "px";
    for(let m of this.markerList) {
      m.updatePosition(this.mapDim);
    }
  }

  showInfo() {
    this.router.navigate(["/info"]);
  }

  showScanner() {
    this.router.navigate(["/scanner"]);
  }


  getMarker(id): Marker {
    for(let i of this.markerList) {
      if(i.id == id) {
        return i;
      }
    }
    return null;
  }
}
