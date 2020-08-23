import {
  Component,
  OnInit,
  AfterViewInit
} from '@angular/core';
import {
  Router
} from '@angular/router';

import jsQR from "jsqr";

import{GoogleAnalyticsService} from '../../services/google-analytics/google-analytics.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit, AfterViewInit {

  constructor(private router: Router,
    private googleAnalyticsService: GoogleAnalyticsService) {}

  found = false;
  canvas;
  video;
  canvasElement;
  infoText;
  success = false;

  errorImage = new Image();

  ngAfterViewInit() {
    this.canvasElement = document.getElementById("canvas");
    this.video = document.getElementById("video");
    this.canvas = (this.canvasElement as any).getContext("2d");
    this.infoText = document.getElementById("infoText");

    this.errorImage.src = "../../../assets/img/error.svg";

    var startTime = Date.now();
    var detectPermissionDialog = function (allowed) {
      this.found = allowed;
    };

    let self = this;
    var successCallback = function (stream) {
      //detectPermissionDialog(true);
      document.getElementById("infoText").innerText = "🎥 Richten Sie die Kamera nun auf den QR-Code neben der Stehle";
      (this.video as any).srcObject = stream;
      this.found = true;
    };


    setTimeout(function() {
      let infoEl = document.getElementById("infoText");
      if(!this.found && infoEl != null)
        infoEl.innerText = "🎥 Bitte Zugriff auf Kamera aktivieren";
    }.bind(this), 800);


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
    if(this.video == null || this.video == undefined || document.getElementById("infoText") == null || !this.found) {
      requestAnimationFrame(() => this.tick());
      return;
    }

    document.getElementById("infoText").innerText = "⌛ Lädt Video..."
      if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
        //this.infoText.hidden = true;
        document.getElementById("infoText").innerText = "🎥 Richten Sie die Kamera nun auf den QR-Code neben der Stehle";
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

            this.infoText.innerText = "Ungültiger QR-Code!";
            this.googleAnalyticsService.eventEmitter("qr_code_scanner", "invalid", "scan");
          } else if (code.data == "https://zeitzeugen.art/") {
            this.router.navigate["/map"];
          } else {
            this.infoText.innerText = "";
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

    this.googleAnalyticsService.eventEmitter("qr_code_scanner", "successful", "scan");
    
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
