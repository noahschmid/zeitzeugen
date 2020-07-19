import {
  Component,
  OnInit,
  AfterViewInit
} from '@angular/core';
import {
  Router
} from '@angular/router';

import jsQR from "jsqr";

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit, AfterViewInit {

  constructor(private router: Router) {}

  found = true;
  canvas;
  video;
  canvasElement;
  info;
  success = false;

  errorImage = new Image();

  ngAfterViewInit() {
    this.canvasElement = document.getElementById("canvas");
    this.video = document.getElementById("video");
    this.canvas = (this.canvasElement as any).getContext("2d");
    this.info = document.getElementById("info");

    this.errorImage.src = "../../../assets/img/error.svg";

    var startTime = Date.now();
    var detectPermissionDialog = function (allowed) {
      this.found = true;
      if (Date.now() - startTime > 500 || allowed) {
        this.found = true;
        // dialog was shown
        if(allowed) {
          this.found = true;
        }
      }
    };

    let self = this;
    var successCallback = function (stream) {
      //detectPermissionDialog(true);
      this.info.innerText = "Richten Sie die Kamera nun auf den QR-Code neben der Stehle";
      (this.video as any).srcObject = stream;
    };

    var errorCallback = function (error) {
      this.found = false;
      if ((error.name == 'NotAllowedError') ||
        (error.name == 'PermissionDismissedError')) {
        detectPermissionDialog(false);
      }
    };

    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { facingMode: { ideal: 'environment' } }
    }).then(successCallback.bind(this), errorCallback.bind(this));
  }

  ngOnInit(): void {
    requestAnimationFrame(() => this.tick());
  }

  drawLine(begin, end, success) {
    let color = "36c9a2";
    if(!success) {
      color = "FF3B58";
    }
    this.canvas.beginPath();
    this.canvas.moveTo(begin.x, begin.y);
    this.canvas.lineTo(end.x, end.y);
    this.canvas.lineWidth = 4;
    this.canvas.strokeStyle = color;
    this.canvas.stroke();
  }

  tick() {
    if(this.video == null || this.video == undefined) {
      requestAnimationFrame(() => this.tick());
      return;
    }

    this.info.innerText = "⌛ Lädt Video..."
      if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
        //this.info.hidden = true;
        this.info.innerText = "Richten Sie die Kamera nun auf den QR-Code neben der Stehle";
        this.canvasElement.hidden = false;
      //  this.outputContainer.hidden = false;

      this.canvasElement.height = this.video.videoHeight;
      this.canvasElement.width = this.video.videoWidth;
      this.canvas.drawImage(this.video, 0, 0,  this.canvasElement.width,  this.canvasElement.height);
        var imageData = this.canvas.getImageData(0, 0,  this.canvasElement.width,  this.canvasElement.height);
        var code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        if (code) {
          if(code.data.indexOf("zeitzeugen.art/interview") == -1) {
            let width = code.location.topRightCorner.x - code.location.topLeftCorner.x;
            let height = code.location.topRightCorner.y - code.location.bottomRightCorner.y;
            this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, false);
            this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, false);
            this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, false);
            this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, false);
            this.canvas.font = "5vh Verdana";
            this.canvas.strokeStyle = "white";
            this.canvas.drawImage(this.errorImage, code.location.topLeftCorner.x, code.location.topLeftCorner.y - height, width, height);

            this.info.innerText = "Ungültiger QR-Code!";
          } else if (code.data.indexOf("zeitzeugen.art") != -1) {
            this.router.navigate["/map"];
          } else {
            this.info.innerText = "";
            this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, true);
            this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, true);
            this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, true);
            this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, true);
            this.scanCompleted(code.data);

            this.success = true;
            return;
          }
        }
      }
      requestAnimationFrame(() => this.tick());
  }

  scanCompleted(result) {
    let tmp: String = result;

    tmp = tmp.substr(tmp.indexOf("?") + 4);

    let id = tmp.substr(0, tmp.indexOf("&"));
    let ulock = tmp.substr(tmp.indexOf("&") + 7);

    this.canvasElement.style.display = "none";

    window.setTimeout(() => {
      this.router.navigate(["/interview"], {
        queryParams: {
          id,
          ulock
        }
      });
    }, 500);
  }
}
