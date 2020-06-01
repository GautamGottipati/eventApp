import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { LiveComponent } from './events/live/live.component';
import { PastComponent } from './events/past/past.component';
import { UpcomingComponent } from './events/upcoming/upcoming.component';
import { ComingsoonPageComponent } from './comingsoon-page/comingsoon-page.component';
import { EventPageComponent } from './event-page/event-page.component';
import { RegistrationComponent } from './registration/registration.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { SuccessComponent } from './success/success.component';
import { SignupComponent } from './signup/signup.component';
import { EventCreateComponent } from './event-create/event-create.component';



const routes: Routes = [
  {
    path: '',
    component:DashboardComponent,
    children:[
      {path:'live',component:LiveComponent},
      {path:'past',component:PastComponent},
      {path:'upcoming',component:UpcomingComponent}
    ]  
    
  },
  {
    path:'event',
    component:EventPageComponent
  },
  {
    path:'register',
    component:RegistrationComponent
  },
  {
    path:'confirm',
    component:ConfirmComponent
  },
  {
    path:'createevent',
    component:EventCreateComponent
  },
  {
    path:'edit/:postid',
    component:EventCreateComponent
  },
  // {
  //   path:'dashboard',
  //   component:DashboardComponent,
  //   children:[
  //     {path:'live',component:LiveComponent},
  //     {path:'past',component:PastComponent},
  //     {path:'upcoming',component:UpcomingComponent}
  //   ]  
  // },
  {
    path:'**',
    component:ComingsoonPageComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
