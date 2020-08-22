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

  editMode: boolean = true;
  width;
  height;
  mapDim;
  windowDim;

  @ViewChild('mapContent', { read: ElementRef }) public mapContent: ElementRef<any>;

  ngOnInit(): void {
    this.windowDim = {w:document.documentElement.clientWidth, h:document.documentElement.clientHeight };
    let map = document.getElementById("map");

    document.addEventListener('scroll', () => {
      this.windowDim = {w:document.documentElement.clientWidth, h:document.documentElement.clientHeight };
      this.updateDimension();
    });

    setTimeout(() => {
      document.getElementById("loading").style.display = "none";
      this.mapDim = map.getBoundingClientRect();

      this.updateDimension();

      if(this.mapDim.width > this.windowDim.w) {
        let scrollAmt = (this.mapDim.width  - this.windowDim.w)/2;
        this.mapContent.nativeElement.scrollTo({ left: (this.mapContent.nativeElement.scrollLeft + scrollAmt), behavior: 'auto' });
      }      
    }, 200);
  }

  setMarker(event): void {
    if(!this.editMode || event.x < this.mapDim.x || event.x > this.mapDim.x + this.mapDim.width)
      return;

    let normalized = {x:(event.x - this.mapDim.x) / this.mapDim.width, y:(event.y - this.mapDim.y) / this.mapDim.height};
    let speaker = new Speaker("Jon", "Doe", "Testdummy", "Bot", 44);
    let newMarker = new Marker(normalized.x, normalized.y, this.markerService.getMarkers.length, this.mapDim, speaker, "filename");
    this.markerService.addMarker(newMarker);
  }

  onClickMarker(id): void {
    let marker = this.markerService.getMarker(id);

    if(this.editMode)
      console.log(this.generatorService.encode(id));

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
    this.updateDimension();
  }

  updateDimension() {
    if(document.getElementById("map") == null) {
      return;
    }

    this.mapDim = document.getElementById("map").getBoundingClientRect();
    let infoIcon = document.getElementById("info"); 
    let scannerIcon = document.getElementById("scanner");

    this.mapDim.x = this.mapDim.left;


    infoIcon.style.marginLeft = (this.mapDim.width * 0.08) + "px";
    scannerIcon.style.marginLeft = (this.mapDim.width - scannerIcon.getBoundingClientRect().width - this.mapDim.width * 0.08) + "px";
    
    this.markerService.updatePosition(this.mapDim);
  }

  showInfo() {
    this.router.navigate(["/info"]);
  }

  showScanner() {
    this.router.navigate(["/scanner"]);
  }
}
