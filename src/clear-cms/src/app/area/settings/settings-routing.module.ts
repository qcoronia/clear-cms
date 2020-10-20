import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { ContentTypeExplorerComponent } from 'src/app/core/content-type-explorer/content-type-explorer.component';

const routes: Routes = [
  { path: '', component: SettingsComponent, children: [
    { path: 'content-types', component: ContentTypeExplorerComponent },
    { path: 'template-parts', component: SettingsComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
