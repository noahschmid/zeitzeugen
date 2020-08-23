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
import { Speaker } from 'src/app/models/speaker';
import { MarkerService } from 'src/app/services/marker-service/marker.service';
import { GeneratorService } from 'src/app/services/generator/generator.service';
import { info } from 'console';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers:[DialogService, MessageService]
})
export class MapComponent implements OnInit {

  constructor(private dialogService: DialogService,
    private dialog: MatDialog,
    private router: Router,
    public markerService: MarkerService,
    private generatorService: GeneratorService) { }

  editMode: boolean = false;
  width;
  height;
  mapDim;
  windowDim;
  bonusUnlocked = false;
  DEBUG = false;

  deleteMode: boolean = false;

  @ViewChild('mapContent', { read: ElementRef }) public mapContent: ElementRef<any>;
  ngOnInit(): void {
    fetch('../../../assets/json/config.json')
    .then(response => response.json())
    .then(json => {
      this.DEBUG = json.debug;
    });
    this.windowDim = {w:document.documentElement.clientWidth, h:document.documentElement.clientHeight };
    this.markerService.getStatus().subscribe(loaded => {
      if(loaded) {
        let map = document.getElementById("map");
        let bounds = map.getBoundingClientRect();
        this.bonusUnlocked = this.markerService.allUnlocked();
        this.markerService.setBounds(bounds);
        document.getElementById("loading").style.display = "none";

        if(bounds.height == 0) {
          document.getElementById("loading").style.display = "";
          setTimeout(() => {
            document.getElementById("loading").style.display = "none";
            let bounds = document.getElementById("map").getBoundingClientRect();
            this.markerService.setBounds(bounds);
          }, 250);
        }
      }
    })
    this.updateDimension();
    if(this.editMode) {
      document.getElementById("wrapper").focus();
    }
  }

  onClickBonus() {
    this.markerService.unlock(-1, true);
    this.router.navigate(["/interview"], { queryParams:{id:-1} });
  }

  printMarkers(event : KeyboardEvent) {
    if(event.key == "e" && this.DEBUG)
      this.editMode = !this.editMode;

    if(!this.editMode)
      return;

    if(event.key == "q")
      this.deleteMode = !this.deleteMode;

    if(event.key == "d")
      console.log(this.markerService.prettyPrintMarkers());
    
    if(event.key == "s") {
      this.copyToClipboard(this.markerService.prettyPrintMarkers());
    }
  }

  setMarker(event): void {
    if(!this.editMode || this.deleteMode || event.x < this.mapDim.x || event.x > this.mapDim.x + this.mapDim.width)
      return;

    let bounds = document.getElementById("map").getBoundingClientRect();
    this.markerService.setBounds(bounds);

    let normalized = {x:(event.x - bounds.x)/bounds.width, y:(event.y - bounds.y)/bounds.height};
    let speaker = new Speaker("", "", "", 0);
    let newMarker = new Marker(normalized.x, normalized.y, this.markerService.getMarkers.length, speaker, "");
    this.markerService.addMarker(newMarker);
  }

  copyToClipboard(item : string) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }

  onClickMarker(id): void {
    if(this.editMode) {
      console.log(this.generatorService.encode(id));
      if(this.deleteMode)
        this.markerService.deleteMarker(id);
      return;
    }

    let marker = this.markerService.getMarker(id);

    if(marker.unlocked) {
      this.router.navigate(["/interview"], { queryParams:{id:marker.id} });
    } else {
      const ref = this.dialog.open(CodeInputComponent, {
        data:id,
        panelClass:'dialog-class'
      });

      ref.afterClosed().subscribe(unlocked => {
        this.markerService.unlock(id, unlocked);
        if(unlocked)
          this.router.navigate(["/interview"], {queryParams:{id:marker.id}});
      })
    }
  }

  onResize(event) {
    this.windowDim = {w:event.target.innerWidth, h:event.target.innerHeight}
    let bounds = document.getElementById("map").getBoundingClientRect();
    this.updateDimension();
    this.markerService.setBounds(bounds);
  }

  updateDimension() {
    if(document.getElementById("map") == null) {
      return;
    }
    
    this.mapDim = document.getElementById("map").getBoundingClientRect();
    let infoIcon = document.getElementById("info"); 
    let scannerIcon = document.getElementById("scanner");

    infoIcon.style.marginLeft = (this.mapDim.width * 0.08) + "px";
    scannerIcon.style.marginLeft = (this.mapDim.width - scannerIcon.getBoundingClientRect().width - this.mapDim.width * 0.08) + "px";
  }

  showInfo() {
    this.router.navigate(["/info"]);
  }

  showScanner() {
    this.router.navigate(["/scanner"]);
  }
}
