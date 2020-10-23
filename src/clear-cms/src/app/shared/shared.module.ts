import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabContainerModule } from './tab-container/tab-container.module';
import { TreeNodeModule } from './tree-node/tree-node.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    TabContainerModule,
    TreeNodeModule,
  ],
  exports: [
    TabContainerModule,
    TreeNodeModule,
  ]
})
export class SharedModule { }
