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

  public async exists(): Promise<boolean> {
    return await this.db.count(DB_NAME).toPromise() > 0;
  }

  public async initDefaults(): Promise<void> {
    this.init({
      initialData: DEFAULT_DATA,
    });
  }

  public init(opts?: DatabaseOptions) {
    return from(this.db.count(DB_NAME)).pipe(
      switchMap(count => {
        if (count > 0) {
          return of([]);
        }

        const tablesWithData = new Array<Observable<number>[]>();
        if (!!opts.initialData.contentType) {
          tablesWithData.push(opts.initialData.contentType.map(e => from(this.db.add('contentType', e))));
        }

        if (!!opts.initialData.content) {
          tablesWithData.push(opts.initialData.content.map(e => from(this.db.add('content', e))));
        }

        if (!!opts.initialData.fieldType) {
          tablesWithData.push(opts.initialData.fieldType.map(e => from(this.db.add('fieldType', e))));
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
