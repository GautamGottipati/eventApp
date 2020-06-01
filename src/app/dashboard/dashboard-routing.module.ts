import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiveComponent } from '../events/live/live.component';
import { PastComponent } from '../events/past/past.component';
import { UpcomingComponent } from '../events/upcoming/upcoming.component';
 

const routes: Routes = [
  {path: 'live', component:LiveComponent},
  {path: 'past', component:PastComponent},
  {path: 'upcoming', component:UpcomingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
export const routingComponent = [LiveComponent,PastComponent,UpcomingComponent]
