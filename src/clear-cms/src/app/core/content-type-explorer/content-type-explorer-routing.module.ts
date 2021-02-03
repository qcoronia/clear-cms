import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContentTypeExplorerComponent } from './content-type-explorer.component';
import { ContentTypeFormComponent } from '../content-type-form/content-type-form.component';

const routes: Routes = [
  { path: '', component: ContentTypeExplorerComponent, children: [
    { path: 'new', component: ContentTypeFormComponent },
    { path: 'new/:parentAlias', component: ContentTypeFormComponent },
    { path: 'edit/:alias', component: ContentTypeFormComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentTypeExplorerRoutingModule { }
