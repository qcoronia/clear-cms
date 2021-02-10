import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { DataType } from '../database/models/data-type.model';
import { Observable } from 'rxjs';
import { DataStore } from 'src/app/utilities/data-store.utility';
import { map, switchMap, tap } from 'rxjs/operators';

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

  public create(dataType: DataType): Observable<number> {
    return this.store.all$.pipe(
      map(dataTypes => dataTypes.filter(e => e.parentAlias === dataType.parentAlias).length),
      map(sortOrder => ({ ...dataType, sortOrder })),
      switchMap(sortedDataType => this.database.create<DataType>('dataType', sortedDataType)),
      tap(_ => this.store.refresh())
    );
  }

  public udpated(dataType: DataType): Observable<number> {
    return this.store.all$.pipe(
      map(dataTypes => dataTypes.filter(e => e.parentAlias === dataType.parentAlias).length),
      map(sortOrder => ({ ...dataType, sortOrder })),
      switchMap(sortedDataType => this.database.update<DataType>('dataType', sortedDataType)),
      tap(_ => this.store.refresh())
    );
  }

  public delete(alias: string): Observable<number> {
    return this.database.deleteOne<DataType>('dataType', alias).pipe(
      tap(_ => this.store.refresh())
    );
  }

}
