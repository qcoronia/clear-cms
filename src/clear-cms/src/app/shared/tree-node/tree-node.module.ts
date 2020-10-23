import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNodeComponent } from './tree-node.component';



@NgModule({
  declarations: [TreeNodeComponent],
  imports: [
    CommonModule
  ],
  exports: [TreeNodeComponent]
})
export class TreeNodeModule { }
