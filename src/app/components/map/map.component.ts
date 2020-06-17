import { Component, OnInit } from '@angular/core';
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

  editMode: boolean = false;

  ngOnInit(): void {
    let marker = new Marker(226, 461, 0);
    marker.unlocked = true;
    this.markerList.push(marker);

    marker = new Marker(248, 310, 1);
    this.markerList.push(marker);

    marker = new Marker(102, 263, 2);
    this.markerList.push(marker);
  }

  setMarker(event): void {
    if(!this.editMode)
      return;
    let height = document.documentElement.clientHeight * 0.05;
    let width = document.documentElement.clientWidth * 0.05;
    console.log(event.x + " " + event.y);
    let newMarker = new Marker(event.x - width, event.y - height, 0);
    this.markerList.push(newMarker);
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

  getMarker(id): Marker {
    for(let i of this.markerList) {
      if(i.id == id) {
        return i;
      }
    }
    return null;
  }
}
