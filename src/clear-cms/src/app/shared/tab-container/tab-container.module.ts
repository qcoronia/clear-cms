import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabContainerComponent } from './tab-container.component';
import { RouterModule } from '@angular/router';
import { TabContainerItemModule } from '../tab-container-item/tab-container-item.module';



@NgModule({
  declarations: [TabContainerComponent],
  imports: [
    CommonModule,
    RouterModule,
    TabContainerItemModule,
  ],
  exports: [TabContainerComponent]
})
export class TabContainerModule { }
