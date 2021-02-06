import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentTypeService } from './content-type/content-type.service';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { dbConfig } from './database/database-config';
import { DataTypeService } from './data-type/data-type.service';
import { ContentService } from './content/content.service';



@NgModule({
  imports: [
    CommonModule,

    NgxIndexedDBModule.forRoot(dbConfig),
  ],
})
export class ServicesModule {
  public static forRoot(): ModuleWithProviders<ServicesModule> {
    return {
      ngModule: ServicesModule,
      providers: [
        ContentService,
        ContentTypeService,
        DataTypeService
      ]
    };
  }
}
