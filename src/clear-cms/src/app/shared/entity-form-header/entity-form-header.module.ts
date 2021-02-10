import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityFormHeaderComponent } from './entity-form-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [EntityFormHeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [EntityFormHeaderComponent]
})
export class EntityFormHeaderModule { }
