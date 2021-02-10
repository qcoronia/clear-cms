import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTypeListComponent } from './data-type-list.component';
import { TreeNodeModule } from 'src/app/shared/tree-node/tree-node.module';


@NgModule({
  declarations: [DataTypeListComponent],
  imports: [
    CommonModule,

    TreeNodeModule,
  ],
  exports: [DataTypeListComponent]
})
export class DataTypeListModule { }
