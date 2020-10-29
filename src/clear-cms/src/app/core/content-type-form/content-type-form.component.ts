import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReplaySubject, Subject, Observable } from 'rxjs';
import { ContentType } from 'src/app/services/database/models/contentType.model';
import { takeWhile, takeUntil, tap, switchMap, shareReplay, pairwise, map, filter } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { ContentTypeService } from 'src/app/services/content-type/content-type.service';
import { DataTypeService } from 'src/app/services/data-type/data-type.service';
import { DataType } from 'src/app/services/database/models/data-type.model';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-content-type-form',
  templateUrl: './content-type-form.component.html',
  styleUrls: ['./content-type-form.component.scss']
})
export class ContentTypeFormComponent implements OnInit, OnDestroy {

  public alias: string;
  public original: ContentType;

  public dataTypes$: Observable<DataType[]>;

  public form: FormGroup;
  public editorOptions: any;

  private whenNavigated$: ReplaySubject<string>;
  private whenDestroyed$: Subject<void>;
  private whenFormResetted$: Subject<void>;

  private propertyAliasChanged$: Subject<string>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private contentType: ContentTypeService,
    private dataType: DataTypeService) {
    this.whenNavigated$ = new ReplaySubject<any>();
    this.whenDestroyed$ = new Subject<any>();
    this.whenFormResetted$ = new Subject<any>();

    this.form = this.formBuilder.group({
      alias: [null],
      parentAlias: [null],
      template: [null],
      properties: this.formBuilder.array([this.newPropertyFormGroup()]),
    });

    this.editorOptions = {
      theme: 'vs-light',
      language: 'html',
    };

    this.dataTypes$ = this.dataType.getAll().pipe(
      shareReplay(1)
    );
    this.propertyAliasChanged$ = new Subject<string>();
    this.propertyAliasChanged$.pipe(
      pairwise(),
      takeUntil(this.whenDestroyed$),
    ).subscribe();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.whenNavigated$.next(params.alias));

    this.whenNavigated$.pipe(
      switchMap(alias => this.contentType.getOne(alias)),
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
      template: contentType.template,
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

}
