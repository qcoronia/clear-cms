import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentTypeFormComponent } from './content-type-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';



@NgModule({
  declarations: [ContentTypeFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule.forRoot(),
  ],
  exports: [ContentTypeFormComponent],
})
export class ContentTypeFormModule { }
