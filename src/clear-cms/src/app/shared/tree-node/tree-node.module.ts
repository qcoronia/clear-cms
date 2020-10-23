import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNodeComponent } from './tree-node.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [TreeNodeComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [TreeNodeComponent]
})
export class TreeNodeModule { }
