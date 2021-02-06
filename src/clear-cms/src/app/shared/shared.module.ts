import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabContainerModule } from './tab-container/tab-container.module';
import { TreeNodeModule } from './tree-node/tree-node.module';
import { DashboardWidgetModule } from './dashboard-widget/dashboard-widget.module';
import { SpinnerModule } from './spinner/spinner.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    TabContainerModule,
    TreeNodeModule,
    DashboardWidgetModule,
    SpinnerModule,
  ],
  exports: [
    TabContainerModule,
    TreeNodeModule,
    DashboardWidgetModule,
    SpinnerModule,
  ]
})
export class SharedModule { }
