import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyEditorComponent } from './property-editor.component';



@NgModule({
  declarations: [PropertyEditorComponent],
  imports: [
    CommonModule
  ],
  exports: [PropertyEditorComponent]
})
export class PropertyEditorModule { }
