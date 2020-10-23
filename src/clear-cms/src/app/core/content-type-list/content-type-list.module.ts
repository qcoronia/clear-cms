import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentTypeListComponent } from './content-type-list.component';
import { TreeNodeModule } from 'src/app/shared/tree-node/tree-node.module';



@NgModule({
  declarations: [ContentTypeListComponent],
  imports: [
    CommonModule,

    TreeNodeModule,
  ],
  exports: [ContentTypeListComponent],
})
export class ContentTypeListModule { }
