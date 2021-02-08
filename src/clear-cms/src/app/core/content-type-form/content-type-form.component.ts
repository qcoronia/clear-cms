import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReplaySubject, Subject, Observable, of } from 'rxjs';
import { ContentType } from 'src/app/services/database/models/contentType.model';
import { takeWhile, takeUntil, tap, switchMap, shareReplay, pairwise, map, filter, defaultIfEmpty, take, catchError } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormArray, AbstractControl, Validators } from '@angular/forms';
import { ContentTypeService } from 'src/app/services/content-type/content-type.service';
import { DataTypeService } from 'src/app/services/data-type/data-type.service';
import { DataType } from 'src/app/services/database/models/data-type.model';
import { templateJitUrl } from '@angular/compiler';
import { Template } from 'src/app/services/database/models/template.model';
import { TemplateService } from 'src/app/services/template/template.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-content-type-form',
  templateUrl: './content-type-form.component.html',
  styleUrls: ['./content-type-form.component.scss']
})
export class ContentTypeFormComponent implements OnInit, OnDestroy {

  public alias: string;
  public original: ContentType;

  public contentTypeAliases$: Observable<string[]>;
  public dataTypes$: Observable<DataType[]>;
  public templates$: Observable<Template[]>;

  public form: FormGroup;
  public editorOptions: any;

  private whenNavigated$: ReplaySubject<Params>;
  private whenDestroyed$: Subject<void>;
  private whenFormResetted$: Subject<void>;

  private propertyAliasChanged$: Subject<string>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private contentType: ContentTypeService,
    private dataType: DataTypeService,
    private template: TemplateService,
    private toastr: ToastrService) {
    this.whenNavigated$ = new ReplaySubject<any>();
    this.whenDestroyed$ = new Subject<any>();
    this.whenFormResetted$ = new Subject<any>();

    this.form = this.formBuilder.group({
      alias: [null],
      parentAlias: [null],
      templateAlias: [null],
      properties: this.formBuilder.array([this.newPropertyFormGroup()]),
    });

    this.editorOptions = {
      theme: 'vs-light',
      language: 'html',
    };

    this.contentTypeAliases$ = this.contentType.getAll().pipe(
      map(e => e.map(f => f.alias)),
      shareReplay(1)
    );
    this.dataTypes$ = this.dataType.getAll().pipe(
      shareReplay(1)
    );
    this.templates$ = this.template.getAll().pipe(
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
        ? this.contentType.getOne(params.alias)
        : of({ parentAlias: params.parentAlias, properties: [] } as ContentType)),
      tap(contentType => this.original = contentType),
      tap(contentType => this.revertForm()),
      takeUntil(this.whenDestroyed$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.whenDestroyed$.complete();
  }

  get propertiesControls(): AbstractControl[] {
    return (this.form.get('properties') as FormArray).controls;
  }

  private newPropertyFormGroup(): FormGroup {
    const formGroup = this.formBuilder.group({
      alias: [null],
      dataTypeAlias: [null],
    });

    formGroup.get('alias').valueChanges.pipe(
      pairwise(),
      filter(changes => !!this.form.get('template').value),
      tap(changes => this.form.patchValue({
        template: this.form.get('template').value.replace(`{{${changes[0]}}}`, `{{${changes[1]}}}`),
      })),
    ).subscribe();

    return formGroup;
  }

  public addProperty(): void {
    (this.form.get('properties') as FormArray).push(this.newPropertyFormGroup());
  }

  public removeProperty(idx: number): void {
    (this.form.get('properties') as FormArray).removeAt(idx);
  }

  public revertForm(): void {
    const contentType = this.original;
    this.form.reset();
    this.whenFormResetted$.next();
    this.form.patchValue({
      alias: contentType.alias,
      parentAlias: contentType.parentAlias,
      templateAlias: contentType.templateAlias,
    });
    while (this.propertiesControls.length > 0) {
      this.propertiesControls.pop();
    }

    for (const prop of contentType.properties) {
      this.addProperty();
      this.propertiesControls[this.propertiesControls.length - 1].patchValue({
        alias: prop.alias,
        dataTypeAlias: prop.dataTypeAlias,
      });
    }
  }

  public submit(): void {
    const contentType = this.form.getRawValue() as ContentType;
    this.contentType.create(contentType).pipe(
      take(1),
    ).subscribe(
      _ => this.toastr.success(`Content Type '${contentType.alias}' created`),
      err => this.toastr.error(`Failed to create Content Type '${contentType.alias}'`));
  }

}
