import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { ContentType } from 'src/app/services/database/models/contentType.model';
import { takeWhile, takeUntil, tap, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContentTypeService } from 'src/app/services/content-type/content-type.service';

@Component({
  selector: 'app-content-type-form',
  templateUrl: './content-type-form.component.html',
  styleUrls: ['./content-type-form.component.scss']
})
export class ContentTypeFormComponent implements OnInit, OnDestroy {

  public alias: string;
  public original: ContentType;

  private whenNavigated$: ReplaySubject<string>;
  private whenDestroyed$: Subject<any>;

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private contentType: ContentTypeService) {
    this.whenNavigated$ = new ReplaySubject<any>();
    this.whenDestroyed$ = new Subject<any>();

    this.form = this.formBuilder.group({
      alias: [null],
      parentAlias: [null],
      template: [null],
      properties: this.formBuilder.array([]),
      newProperty: this.formBuilder.group({
        alias: [null],
        fieldTypeAlias: [null],
      }),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.whenNavigated$.next(params.alias));

    this.whenNavigated$.pipe(
      switchMap(alias => this.contentType.getOne(alias)),
      tap(contentType => this.original = contentType),
      tap(contentType => {
        this.form.patchValue({
          alias: contentType.alias,
          parentAlias: contentType.parentAlias,
          template: contentType.template,
        });
      }),
      takeUntil(this.whenDestroyed$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.whenDestroyed$.complete();
  }

}
