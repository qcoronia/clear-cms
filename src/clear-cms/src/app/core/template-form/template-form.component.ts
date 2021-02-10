import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { map, shareReplay, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { ContentTypeService } from 'src/app/services/content-type/content-type.service';
import { DataTypeService } from 'src/app/services/data-type/data-type.service';
import { DataType } from 'src/app/services/database/models/data-type.model';
import { Template } from 'src/app/services/database/models/template.model';
import { TemplateService } from 'src/app/services/template/template.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  public alias: string;
  public original: Template;

  public templates$: Observable<Template[]>;
  public templateAliases$: Observable<string[]>;

  public form: FormGroup;
  public editorOptions: any;

  private whenNavigated$: ReplaySubject<Params>;
  private whenDestroyed$: Subject<void>;
  private whenFormResetted$: Subject<void>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private template: TemplateService,
    private toastr: ToastrService) {
    this.whenNavigated$ = new ReplaySubject<any>();
    this.whenDestroyed$ = new Subject<any>();
    this.whenFormResetted$ = new Subject<any>();

    this.form = this.formBuilder.group({
      alias: [null],
      parentAlias: [null],
      content: [null],
    });

    this.editorOptions = {
      theme: 'vs-light',
      language: 'html',
    };

    this.templates$ = this.template.store.all$.pipe(
      shareReplay(1)
    );
    this.templateAliases$ = this.templates$.pipe(
      map(e => e.map(f => f.alias))
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.whenNavigated$.next(params));

    this.whenNavigated$.pipe(
      switchMap(params => !!params.alias
        ? this.template.getOne(params.alias)
        : of({ parentAlias: params.parentAlias, content: '' } as Template)),
      tap(template => this.original = template),
      tap(contentType => this.revertForm()),
      takeUntil(this.whenDestroyed$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.whenDestroyed$.complete();
  }

  public revertForm(): void {
    const template = this.original;
    this.form.reset();
    this.whenFormResetted$.next();
    this.form.patchValue({
      alias: template.alias,
      parentAlias: template.parentAlias,
      content: template.content,
    });
  }

  public submit(): void {
    const template = this.form.getRawValue() as Template;
    this.template.create(template).pipe(
      take(1),
    ).subscribe(
      _ => this.toastr.success(`Template '${template.alias}' created`),
      err => this.toastr.error(`Failed to create Template '${template.alias}'`));
  }

}
