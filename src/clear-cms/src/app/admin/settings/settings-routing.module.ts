import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { DatabaseManagementComponent } from 'src/app/core/database-management/database-management.component';

const routes: Routes = [
  { path: '', component: SettingsComponent, children: [
    { path: 'content-types', loadChildren: () => import('src/app/core/content-type-explorer/content-type-explorer.module')
      .then(m => m.ContentTypeExplorerModule) },
      { path: 'data-types', loadChildren: () => import('src/app/core/data-type-explorer/data-type-explorer.module')
        .then(m => m.DataTypeExplorerModule) },
    { path: 'templates', loadChildren: () => import('src/app/core/template-explorer/template-explorer.module')
      .then(m => m.TemplateExplorerModule) },
    { path: 'database', component: DatabaseManagementComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
