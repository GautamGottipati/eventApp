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
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './admin/admin.component';
import { PageComponent } from './admin/page/page.component';



const routes: Routes = [
  {
    path: '',
    component:DashboardComponent,
    children:[
      {path:'events',component:UpcomingComponent}
    ]  
    
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'event/:postid',
    component:EventPageComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'event/:postid/register',
    component:RegistrationComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'event/:postid/register/:edit',
    component:RegistrationComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'confirm',
    component:ConfirmComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'createevent',
    component:EventCreateComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'edit/:postid',
    component:EventCreateComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'success/:regnum',
    component:SuccessComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'admin',
    component:AdminComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'admin/:type',
    component:PageComponent,
    canActivate:[AuthGuard]
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
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
