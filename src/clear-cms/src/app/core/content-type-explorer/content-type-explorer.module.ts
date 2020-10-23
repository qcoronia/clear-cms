import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentTypeExplorerComponent } from './content-type-explorer.component';
import { ContentTypeListModule } from '../content-type-list/content-type-list.module';
import { ContentTypeFormModule } from '../content-type-form/content-type-form.module';
import { RouterModule } from '@angular/router';
import { ContentTypeExplorerRoutingModule } from './content-type-explorer-routing.module';



@NgModule({
  declarations: [ContentTypeExplorerComponent],
  imports: [
    CommonModule,
    RouterModule,
    ContentTypeExplorerRoutingModule,

    ContentTypeListModule,
    ContentTypeFormModule,
  ],
  exports: [ContentTypeExplorerComponent],
})
export class ContentTypeExplorerModule { }
