import { Injectable } from '@angular/core';
import { Subject, Observable, from, of, zip } from 'rxjs';
import { filter, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { NgxIndexedDBService, DBConfig } from 'ngx-indexed-db';
import { DB_NAME } from './database-config';
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

  public init(opts?: DatabaseOptions) {
    return of({}).pipe(
      switchMap(() => {
        const tablesWithData = new Array<Observable<number>[]>();

        const stores = [
          'contentType',
          'content',
          'fieldType'
        ];

        for (const store of stores) {
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

  public selectAll(storeName: string): Observable<any[]> {
    return this.ensureInitialized$.pipe(
      switchMap(initialized => from(this.db.getAll(storeName))),
    );
  }

  public selectByIndex(storeName: string, index: string, searchTerm: string): Observable<any> {
    return this.ensureInitialized$.pipe(
      switchMap(initialized => from(this.db.getByIndex(DB_NAME, index, searchTerm))),
    );
  }
}
