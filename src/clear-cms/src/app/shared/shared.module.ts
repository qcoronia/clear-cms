import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabContainerModule } from './tab-container/tab-container.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    TabContainerModule,
  ],
  exports: [TabContainerModule]
})
export class SharedModule { }
