import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { DataType } from '../database/models/data-type.model';
import { Observable } from 'rxjs';
import { DataStore } from 'src/app/utilities/data-store.utility';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataTypeService {

  public store: DataStore<DataType>;

  constructor(private database: DatabaseService) {
    this.store = new DataStore<DataType>({
      source: this.database.selectAll<DataType>('dataType'),
    });
  }

  public getOne(alias: string): Observable<DataType> {
    return this.store.all$.pipe(
      map(state => state.find(e => e.alias === alias))
    );
  }

  public getChildren(parentAlias: string): Observable<DataType> {
    return this.store.all$.pipe(
      map(state => state.find(e => e.parentAlias === parentAlias))
    );
  }

}
