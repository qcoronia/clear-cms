import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseManagementComponent } from './database-management.component';



@NgModule({
  declarations: [DatabaseManagementComponent],
  imports: [
    CommonModule
  ],
  exports: [DatabaseManagementComponent],
})
export class DatabaseManagementModule { }
