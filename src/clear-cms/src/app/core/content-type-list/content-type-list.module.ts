import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentTypeListComponent } from './content-type-list.component';



@NgModule({
  declarations: [ContentTypeListComponent],
  imports: [
    CommonModule
  ],
  exports: [ContentTypeListComponent],
})
export class ContentTypeListModule { }
