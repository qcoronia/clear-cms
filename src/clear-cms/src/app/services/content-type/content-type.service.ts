import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ContentType } from '../database/models/contentType.model';

@Injectable({
  providedIn: 'root'
})
export class ContentTypeService {

  constructor(private database: DatabaseService) { }

  public getAll(parentAlias?: string): Observable<ContentType[]> {
    if (!!parentAlias) {
      return this.database.selectByIndex<ContentType>('contentType', 'parentAlias', parentAlias);
    } else {
      return this.database.selectAll<ContentType>('contentType');
    }
  }

  public getOne(alias: string): Observable<ContentType> {
    return this.database.selectOne<ContentType>('contentType', alias);
  }

  public create(contentType: ContentType): Observable<number> {
    return this.database.selectAll<ContentType>('contentType').pipe(
      map(contentTypes => contentTypes.filter(e => e.parentAlias === contentType.parentAlias).length),
      map(sortOrder => ({ ...contentType, sortOrder })),
      switchMap(sortedContentType => this.database.create<ContentType>('contentType', sortedContentType)),
    );
  }

  public delete(alias: string): Observable<number> {
    return this.database.deleteOne<ContentType>('contentType', alias);
  }
}
