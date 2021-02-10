import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { newHash, shiftHash } from './hash.utility';

export class DataStore<T> {

  public all$: Observable<T[]>;

  private stateHash$: BehaviorSubject<string>;

  constructor(options: DataStoreOptions<T>) {
    this.stateHash$ = new BehaviorSubject<string>(newHash());
    this.all$ = this.stateHash$.pipe(
      distinctUntilChanged(),
      switchMap(_ => options.source),
    );
  }

  public refresh(): void {
    this.stateHash$.next(shiftHash(this.stateHash$.value));
  }
}

export interface DataStoreOptions<T> {
  source: Observable<T[]>;
}
