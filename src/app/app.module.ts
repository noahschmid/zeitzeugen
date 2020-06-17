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
import { InterviewComponent } from './interview/interview.component';
import { NgxAudioPlayerModule } from 'ngx-audio-player';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    CodeInputComponent,
    InterviewComponent
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
    NgxAudioPlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
