import { Injectable } from '@angular/core';
import { Subject, Observable, from, of, zip, forkJoin } from 'rxjs';
import { filter, shareReplay, switchMap, take, tap, map, catchError } from 'rxjs/operators';
import { NgxIndexedDBService, DBConfig } from 'ngx-indexed-db';
import { DB_NAME, storeNames } from './database-config';
import { DatabaseOptions } from './database-options';
import { DEFAULT_DATA } from './database-initial-data';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public initialized$: Subject<boolean>;

  private ensureInitialized$: Observable<boolean>;

  constructor(private db: NgxIndexedDBService) {
    this.initialized$ = new Subject<boolean>();
    this.ensureInitialized$ = this.initialized$.pipe(
      filter(initialized => initialized),
      shareReplay(1),
    );
  }

  public initDefaults(): Observable<any[]> {
    return this.init({
      initialData: DEFAULT_DATA,
    });
  }

  public init(opts?: DatabaseOptions): Observable<any[]> {
    return of({}).pipe(
      switchMap(() => {
        const tablesWithData = new Array<Observable<number>[]>();

        for (const store of storeNames) {
          this.db.clear(store);
          if (!!opts.initialData[store]) {
            tablesWithData.push(opts.initialData[store].map(e => from(this.db.add(store, e))));
          }
        }

        return zip(tablesWithData);
      }),
      take(1),
      tap(statuses => this.initialized$.next(true)),
    );
  }

  public selectOne<T>(storeName: string, key: string): Observable<T> {
    return this.db.getByKey(storeName, key).pipe(
      map(data => data as T),
    );
  }

  public selectAll<T>(storeName: string): Observable<T[]> {
    return this.db.getAll(storeName).pipe(
      map(data => data as T[]),
    );
  }

  public selectByIndex<T>(storeName: string, index: string, searchTerm: string): Observable<any> {
    return this.db.getByIndex(DB_NAME, index, searchTerm).pipe(
      map(data => data as T[]),
    );
  }

  public create<T>(storeName: string, entity: T): Observable<number> {
    return this.db.add(storeName, entity).pipe(
      map(_ => 0),
      catchError(err => {
        console.warn('ClearCMS.DatabaseService', err);
        return of(1);
      })
    );
  }

  public update<T>(storeName: string, entity: T): Observable<number> {
    return this.db.update(storeName, entity).pipe(
      map(_ => 0),
      catchError(err => {
        console.warn('ClearCMS.DatabaseService', err);
        return of(1);
      })
    );
  }

  public deleteOne<T>(storeName: string, alias: string): Observable<number> {
    return this.db.delete(storeName, alias).pipe(
      map(_ => 0),
      catchError(err => {
        console.warn('ClearCMS.DatabaseService', err);
        return of(1);
      })
    );
  }

  public packAllAsObject(): Observable<{ [x: string]: any[] }> {
    return forkJoin(storeNames.map(storeName => this.db.getAll(storeName).pipe(
      map(storeData => ({ [storeName]: storeData })),
    ))).pipe(
      map(storeNameDataPairs => storeNameDataPairs.reduce((agg, cur) => ({...agg, ...cur}), ({}))),
      take(1),
    );
  }
}
