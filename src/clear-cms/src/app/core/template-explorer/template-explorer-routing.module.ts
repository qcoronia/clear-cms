import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateFormComponent } from '../template-form/template-form.component';
import { TemplateExplorerComponent } from './template-explorer.component';

const routes: Routes = [
  { path: '', component: TemplateExplorerComponent, children: [
    { path: 'new', component: TemplateFormComponent },
    { path: 'new/:parentAlias', component: TemplateFormComponent },
    { path: 'edit/:alias', component: TemplateFormComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateExplorerRoutingModule { }
