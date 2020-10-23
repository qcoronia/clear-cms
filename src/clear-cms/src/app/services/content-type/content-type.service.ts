import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { map, tap } from 'rxjs/operators';
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
}
