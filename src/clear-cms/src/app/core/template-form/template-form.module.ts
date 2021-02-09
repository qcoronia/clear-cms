import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateFormComponent } from './template-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';


@NgModule({
  declarations: [TemplateFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule.forRoot(),
  ],
  exports: [TemplateFormComponent]
})
export class TemplateFormModule { }
