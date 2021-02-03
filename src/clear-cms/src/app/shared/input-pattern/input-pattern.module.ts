import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPatternDirective } from './input-pattern.directive';



@NgModule({
  declarations: [InputPatternDirective],
  imports: [
    CommonModule
  ],
  exports: [InputPatternDirective]
})
export class InputPatternModule { }
