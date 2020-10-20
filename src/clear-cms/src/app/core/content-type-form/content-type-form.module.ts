import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentTypeFormComponent } from './content-type-form.component';



@NgModule({
  declarations: [ContentTypeFormComponent],
  imports: [
    CommonModule
  ],
  exports: [ContentTypeFormComponent],
})
export class ContentTypeFormModule { }
