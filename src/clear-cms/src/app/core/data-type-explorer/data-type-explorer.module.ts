import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTypeExplorerRoutingModule } from './data-type-explorer-routing.module';
import { DataTypeExplorerComponent } from './data-type-explorer.component';
import { DataTypeListModule } from '../data-type-list/data-type-list.module';
import { DataTypeFormModule } from '../data-type-form/data-type-form.module';


@NgModule({
  declarations: [DataTypeExplorerComponent],
  imports: [
    CommonModule,
    DataTypeExplorerRoutingModule,

    DataTypeListModule,
    DataTypeFormModule,
  ],
  exports: [DataTypeExplorerComponent]
})
export class DataTypeExplorerModule { }
