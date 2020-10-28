import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { DataType } from '../database/models/data-type.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTypeService {

  constructor(private database: DatabaseService) { }

  public getAll(parentAlias?: string): Observable<DataType[]> {
    if (!!parentAlias) {
      return this.database.selectByIndex<DataType>('dataType', 'parentAlias', parentAlias);
    } else {
      return this.database.selectAll<DataType>('dataType');
    }
  }

  public getOne(alias: string): Observable<DataType> {
    return this.database.selectOne<DataType>('dataType', alias);
  }
}
