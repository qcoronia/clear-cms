import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ContentType } from '../database/models/contentType.model';
import { DataStore } from 'src/app/utilities/data-store.utility';

@Injectable({
  providedIn: 'root'
})
export class ContentTypeService {

  public store: DataStore<ContentType>;

  constructor(private database: DatabaseService) {
    this.store = new DataStore<ContentType>({
      source: this.database.selectAll<ContentType>('contentType'),
    });
  }

  public getOne(alias: string): Observable<ContentType> {
    return this.store.all$.pipe(
      map(state => state.find(e => e.alias === alias))
    );
  }

  public getChildren(parentAlias: string): Observable<ContentType> {
    return this.store.all$.pipe(
      map(state => state.find(e => e.parentAlias === parentAlias))
    );
  }

  public create(contentType: ContentType): Observable<number> {
    return this.store.all$.pipe(
      map(contentTypes => contentTypes.filter(e => e.parentAlias === contentType.parentAlias).length),
      map(sortOrder => ({ ...contentType, sortOrder })),
      switchMap(sortedContentType => this.database.create<ContentType>('contentType', sortedContentType)),
      tap(_ => this.store.refresh())
    );
  }

  public udpated(contentType: ContentType): Observable<number> {
    return this.store.all$.pipe(
      map(contentTypes => contentTypes.filter(e => e.parentAlias === contentType.parentAlias).length),
      map(sortOrder => ({ ...contentType, sortOrder })),
      switchMap(sortedContentType => this.database.update<ContentType>('contentType', sortedContentType)),
      tap(_ => this.store.refresh())
    );
  }

  public delete(alias: string): Observable<number> {
    return this.database.deleteOne<ContentType>('contentType', alias).pipe(
      tap(_ => this.store.refresh())
    );
  }
}
