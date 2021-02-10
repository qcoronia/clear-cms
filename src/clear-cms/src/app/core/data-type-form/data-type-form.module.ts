import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTypeFormComponent } from './data-type-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntityFormHeaderModule } from 'src/app/shared/entity-form-header/entity-form-header.module';


@NgModule({
  declarations: [DataTypeFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    EntityFormHeaderModule,
  ],
  exports: [DataTypeFormComponent]
})
export class DataTypeFormModule { }
