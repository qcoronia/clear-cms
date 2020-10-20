import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabContainerModule } from './tab-container/tab-container.module';
import { TabContainerItemModule } from './tab-container-item/tab-container-item.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    TabContainerModule,
    TabContainerItemModule,
  ],
  exports: [TabContainerModule, TabContainerItemModule]
})
export class SharedModule { }
