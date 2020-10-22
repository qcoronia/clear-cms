import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentTypeService } from './content-type/content-type.service';



@NgModule({
  imports: [
    CommonModule,
  ],
})
export class ServicesModule {
  public static forRoot(): ModuleWithProviders<ServicesModule> {
    return {
      ngModule: ServicesModule,
      providers: [ContentTypeService]
    };
  }
}
