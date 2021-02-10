import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, ReplaySubject, Subject, of } from 'rxjs';
import { map, shareReplay, pairwise, takeUntil, switchMap, tap, filter, take } from 'rxjs/operators';
import { DataTypeService } from 'src/app/services/data-type/data-type.service';
import { DataType } from 'src/app/services/database/models/data-type.model';
import { Template } from 'src/app/services/database/models/template.model';
import { TemplateService } from 'src/app/services/template/template.service';

@Component({
  selector: 'app-data-type-form',
  templateUrl: './data-type-form.component.html',
  styleUrls: ['./data-type-form.component.scss']
})
export class DataTypeFormComponent implements OnInit, OnDestroy {

  public alias: string;
  public original: DataType;

  public dataTypeAliases$: Observable<string[]>;
  public dataTypes$: Observable<DataType[]>;
  public templates$: Observable<Template[]>;

  public form: FormGroup;

  private whenNavigated$: ReplaySubject<Params>;
  private whenDestroyed$: Subject<void>;
  private whenFormResetted$: Subject<void>;

  private propertyAliasChanged$: Subject<string>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dataType: DataTypeService,
    private template: TemplateService,
    private toastr: ToastrService) {
    this.whenNavigated$ = new ReplaySubject<any>();
    this.whenDestroyed$ = new Subject<any>();
    this.whenFormResetted$ = new Subject<any>();

    this.form = this.formBuilder.group({
      alias: [null],
      parentAlias: [null],
      type: [null],
      name: [null],
      editor: [null],
    });

    this.dataTypeAliases$ = this.dataType.store.all$.pipe(
      map(e => e
        .map(f => f.alias)
        .filter(alias => alias !== this.form.get('alias').value)),
      shareReplay(1)
    );
    this.dataTypes$ = this.dataType.store.all$.pipe(
      shareReplay(1)
    );
    this.templates$ = this.template.store.all$.pipe(
      shareReplay(1)
    );
    this.propertyAliasChanged$ = new Subject<string>();
    this.propertyAliasChanged$.pipe(
      pairwise(),
      takeUntil(this.whenDestroyed$),
    ).subscribe();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.whenNavigated$.next(params));

    this.whenNavigated$.pipe(
      switchMap(params => !!params.alias
        ? this.dataType.getOne(params.alias)
        : of({ parentAlias: params.parentAlias, type: 'string', name: 'Default', editor: 'text' } as DataType)),
      tap(dataType => this.original = dataType),
      tap(_ => this.revertForm()),
      takeUntil(this.whenDestroyed$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.whenDestroyed$.complete();
  }

  public revertForm(): void {
    const dataType = this.original;
    this.form.reset();
    this.whenFormResetted$.next();
    this.form.patchValue({
      alias: dataType.alias,
      parentAlias: dataType.parentAlias,
      type: dataType.type,
      name: dataType.name,
      editor: dataType.editor,
    });
  }

  public submit(): void {
    const dataType = this.form.getRawValue() as DataType;
    this.dataType.create(dataType).pipe(
      take(1),
    ).subscribe(
      _ => this.toastr.success(`Data Type '${dataType.alias}' created`),
      err => this.toastr.error(`Failed to create Data Type '${dataType.alias}'`));
  }

}
