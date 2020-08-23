import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CodeInputComponent } from './components/code-input/code-input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import { MatDialogModule } from '@angular/material/dialog';
import {InputTextModule} from 'primeng/inputtext';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InterviewComponent } from './pages/interview/interview.component';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { MatSliderModule } from '@angular/material/slider';
import { InfoComponent } from './pages/info/info.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScannerComponent } from './pages/scanner/scanner.component';
import { NavBackComponent } from './components/nav-back/nav-back.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { HeaderComponent } from './components/header/header.component';
import { LockedComponent } from './components/locked/locked.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { TeaserComponent } from './pages/teaser/teaser.component';
import { PlayerComponent } from './components/player/player.component';
import {GoogleAnalyticsService} from './services/google-analytics/google-analytics.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    CodeInputComponent,
    InterviewComponent,
    InfoComponent,
    ScannerComponent,
    NavBackComponent,
    HeaderComponent,
    LockedComponent,
    TeaserComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MessageModule,
    MessagesModule,
    DynamicDialogModule,
    InputTextModule,
    FontAwesomeModule,
    NgxAudioPlayerModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    ZXingScannerModule,
    MatProgressBarModule
  ],
  providers: [GoogleAnalyticsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
