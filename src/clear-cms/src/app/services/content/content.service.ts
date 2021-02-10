import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataStore } from 'src/app/utilities/data-store.utility';
import { DatabaseService } from '../database/database.service';
import { Content } from '../database/models/content.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  public store: DataStore<Content>;

  constructor(private database: DatabaseService) {
    this.store = new DataStore<Content>({
      source: this.database.selectAll<Content>('content'),
    });
  }

  public getOne(alias: string): Observable<Content> {
    return this.store.all$.pipe(
      map(state => state.find(e => e.alias === alias))
    );
  }

  public getChildren(parentAlias: string): Observable<Content> {
    return this.store.all$.pipe(
      map(state => state.find(e => e.parentAlias === parentAlias))
    );
  }

}
