import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateMappingEditorComponent } from './template-mapping-editor.component';



@NgModule({
  declarations: [TemplateMappingEditorComponent],
  imports: [
    CommonModule
  ],
  exports: [TemplateMappingEditorComponent],
})
export class TemplateMappingEditorModule { }
