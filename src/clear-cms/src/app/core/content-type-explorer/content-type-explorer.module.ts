import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentTypeExplorerComponent } from './content-type-explorer.component';
import { ContentTypeListModule } from '../content-type-list/content-type-list.module';
import { ContentTypeFormModule } from '../content-type-form/content-type-form.module';



@NgModule({
  declarations: [ContentTypeExplorerComponent],
  imports: [
    CommonModule,

    ContentTypeListModule,
    ContentTypeFormModule,
  ],
  exports: [ContentTypeExplorerComponent],
})
export class ContentTypeExplorerModule { }
