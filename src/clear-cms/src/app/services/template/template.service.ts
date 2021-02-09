import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DatabaseService } from '../database/database.service';
import { Template } from '../database/models/template.model';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private database: DatabaseService) { }

  public getAll(parentAlias?: string): Observable<Template[]> {
    if (!!parentAlias) {
      return this.database.selectByIndex<Template>('template', 'parentAlias', parentAlias);
    } else {
      return this.database.selectAll<Template>('template');
    }
  }

  public getOne(alias: string): Observable<Template> {
    return this.database.selectOne<Template>('template', alias);
  }

  public create(template: Template): Observable<number> {
    return this.database.selectAll<Template>('template').pipe(
      map(templates => templates.filter(e => e.parentAlias === template.parentAlias).length),
      map(sortOrder => ({ ...template, sortOrder })),
      switchMap(sortedTemplates => this.database.create<Template>('template', sortedTemplates)),
    );
  }

  public delete(alias: string): Observable<number> {
    return this.database.deleteOne<Template>('template', alias);
  }
}
