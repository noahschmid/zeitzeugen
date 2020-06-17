import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { InterviewComponent } from './interview/interview.component';


const routes: Routes = [
  { path:'', component:MapComponent },
  { path:'interview', component:InterviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
