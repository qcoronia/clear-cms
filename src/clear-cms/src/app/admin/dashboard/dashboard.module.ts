import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardWidgetModule } from 'src/app/shared/dashboard-widget/dashboard-widget.module';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,

    DashboardWidgetModule,
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
