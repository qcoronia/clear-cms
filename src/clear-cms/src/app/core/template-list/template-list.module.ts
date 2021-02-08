import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateListComponent } from './template-list.component';
import { TreeNodeModule } from 'src/app/shared/tree-node/tree-node.module';


@NgModule({
  declarations: [TemplateListComponent],
  imports: [
    CommonModule,
    TreeNodeModule,
  ],
  exports: [TemplateListComponent]
})
export class TemplateListModule { }
