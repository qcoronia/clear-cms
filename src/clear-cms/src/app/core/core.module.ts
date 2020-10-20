import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationModule } from './navigation/navigation.module';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    NavigationModule,
    HeaderModule,
    FooterModule,
  ],
  exports: [
    NavigationModule,
    HeaderModule,
    FooterModule,
  ]
})
export class CoreModule { }
