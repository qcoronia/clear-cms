import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { Content } from '../database/models/content.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private database: DatabaseService) { }

  public getAll(parentAlias?: string): Observable<Content[]> {
    if (!!parentAlias) {
      return this.database.selectByIndex<Content>('content', 'parentAlias', parentAlias);
    } else {
      return this.database.selectAll<Content>('content');
    }
  }

  public getOne(alias: string): Observable<Content> {
    return this.database.selectOne<Content>('content', alias);
  }
}
