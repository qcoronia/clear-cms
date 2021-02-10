import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentTypeFormComponent } from './content-type-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertyEditorModule } from 'src/app/shared/property-editor/property-editor.module';



@NgModule({
  declarations: [ContentTypeFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    PropertyEditorModule,
  ],
  exports: [ContentTypeFormComponent],
})
export class ContentTypeFormModule { }
