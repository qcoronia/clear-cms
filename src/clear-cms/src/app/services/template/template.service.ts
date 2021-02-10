import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { DataStore } from 'src/app/utilities/data-store.utility';
import { DatabaseService } from '../database/database.service';
import { Template } from '../database/models/template.model';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  public store: DataStore<Template>;

  constructor(private database: DatabaseService) {
    this.store = new DataStore<Template>({
      source: this.database.selectAll<Template>('template'),
    });
  }

  public getOne(alias: string): Observable<Template> {
    return this.store.all$.pipe(
      map(state => state.find(e => e.alias === alias))
    );
  }

  public getChildren(parentAlias: string): Observable<Template> {
    return this.store.all$.pipe(
      map(state => state.find(e => e.parentAlias === parentAlias))
    );
  }

  public create(template: Template): Observable<number> {
    return this.database.selectAll<Template>('template').pipe(
      map(templates => templates.filter(e => e.parentAlias === template.parentAlias).length),
      map(sortOrder => ({ ...template, sortOrder })),
      switchMap(sortedTemplates => this.database.create<Template>('template', sortedTemplates)),
      tap(_ => this.store.refresh())
    );
  }

  public delete(alias: string): Observable<number> {
    return this.database.deleteOne<Template>('template', alias).pipe(
      tap(_ => this.store.refresh())
    );
  }
}
