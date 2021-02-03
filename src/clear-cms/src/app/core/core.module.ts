import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationModule } from './navigation/navigation.module';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { ContentTypeExplorerModule } from './content-type-explorer/content-type-explorer.module';
import { ContentTypeListModule } from './content-type-list/content-type-list.module';
import { ContentTypeFormModule } from './content-type-form/content-type-form.module';
import { DatabaseManagementModule } from './database-management/database-management.module';
import { TemplateMappingEditorModule } from './template-mapping-editor/template-mapping-editor.module';



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
    DatabaseManagementModule,
    TemplateMappingEditorModule,
  ],
  exports: [
    NavigationModule,
    HeaderModule,
    FooterModule,
    ContentTypeExplorerModule,
    DatabaseManagementModule,
    TemplateMappingEditorModule,
  ]
})
export class CoreModule { }
