import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationModule } from './navigation/navigation.module';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { ContentTypeExplorerModule } from './content-type-explorer/content-type-explorer.module';
import { ContentTypeListModule } from './content-type-list/content-type-list.module';
import { ContentTypeFormModule } from './content-type-form/content-type-form.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    NavigationModule,
    HeaderModule,
    FooterModule,
    ContentTypeExplorerModule,
    ContentTypeListModule,
    ContentTypeFormModule,
  ],
  exports: [
    NavigationModule,
    HeaderModule,
    FooterModule,
    ContentTypeExplorerModule,
  ]
})
export class CoreModule { }
