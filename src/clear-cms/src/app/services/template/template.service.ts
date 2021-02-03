import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
