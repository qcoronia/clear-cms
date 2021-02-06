import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardWidgetComponent } from './dashboard-widget.component';
import { SpinnerModule } from '../spinner/spinner.module';



@NgModule({
  declarations: [DashboardWidgetComponent],
  imports: [
    CommonModule,

    SpinnerModule,
  ],
  exports: [DashboardWidgetComponent],
})
export class DashboardWidgetModule { }
