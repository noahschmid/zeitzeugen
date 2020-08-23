import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { InterviewComponent } from './pages/interview/interview.component';
import { InfoComponent } from './pages/info/info.component';
import { ScannerComponent } from './pages/scanner/scanner.component';
import { TeaserComponent } from './pages/teaser/teaser.component';


const routes: Routes = [
  { path:'', component:TeaserComponent },
  { path:'map', component:MapComponent},
  { path:'interview', component:InterviewComponent},
  { path:'info', component:InfoComponent},
  { path:'scanner', component:ScannerComponent},
  { path:'**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
