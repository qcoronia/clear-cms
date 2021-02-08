import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { ContentTypeExplorerComponent } from 'src/app/core/content-type-explorer/content-type-explorer.component';
import { DatabaseManagementComponent } from 'src/app/core/database-management/database-management.component';

const routes: Routes = [
  { path: '', component: SettingsComponent, children: [
    { path: 'content-types', loadChildren: () => import('src/app/core/content-type-explorer/content-type-explorer.module')
      .then(m => m.ContentTypeExplorerModule) },
    { path: 'templates', component: SettingsComponent },
    { path: 'database', component: DatabaseManagementComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
