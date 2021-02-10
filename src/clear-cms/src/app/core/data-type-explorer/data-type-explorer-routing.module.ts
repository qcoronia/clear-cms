import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTypeFormComponent } from '../data-type-form/data-type-form.component';
import { DataTypeExplorerComponent } from './data-type-explorer.component';

const routes: Routes = [
  { path: '', component: DataTypeExplorerComponent, children: [
    { path: 'new', component: DataTypeFormComponent },
    { path: 'new/:parentAlias', component: DataTypeFormComponent },
    { path: 'edit/:alias', component: DataTypeFormComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataTypeExplorerRoutingModule { }
