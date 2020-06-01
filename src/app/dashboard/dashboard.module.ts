import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardRoutingModule, routingComponent } from './dashboard-routing.module';


@NgModule({
  declarations: [routingComponent],
  imports: [
    RouterModule,
    CommonModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
