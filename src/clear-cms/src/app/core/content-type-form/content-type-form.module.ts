import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentTypeFormComponent } from './content-type-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ContentTypeFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ContentTypeFormComponent],
})
export class ContentTypeFormModule { }
