import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateExplorerRoutingModule } from './template-explorer-routing.module';
import { TemplateExplorerComponent } from './template-explorer.component';
import { RouterModule } from '@angular/router';
import { TemplateListModule } from '../template-list/template-list.module';
import { TemplateFormModule } from '../template-form/template-form.module';


@NgModule({
  declarations: [TemplateExplorerComponent],
  imports: [
    CommonModule,
    RouterModule,

    TemplateExplorerRoutingModule,

    TemplateListModule,
    TemplateFormModule,
  ],
  exports: [TemplateExplorerComponent]
})
export class TemplateExplorerModule { }
