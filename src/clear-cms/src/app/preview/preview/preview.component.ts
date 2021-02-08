import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { BehaviorSubject, ReplaySubject, Subject, zip } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ContentService } from 'src/app/services/content/content.service';
import { Content } from 'src/app/services/database/models/content.model';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  public contents$: BehaviorSubject<Content[]>;

  private whenNavigated$: ReplaySubject<UrlSegment[]>;
  private whenDestroyed$: Subject<void>;

  constructor(private router: Router, private route: ActivatedRoute, private content: ContentService) {
    this.whenNavigated$ = new ReplaySubject<any>();
    this.whenDestroyed$ = new Subject<any>();

    this.contents$ = new BehaviorSubject<Content[]>([]);
  }

  ngOnInit(): void {
    this.route.url.subscribe(urlSegment => this.whenNavigated$.next(urlSegment));

    this.whenNavigated$.pipe(
      map(urlSegments => urlSegments.map(urlSegment => urlSegment.path)),
      map(paths => paths.map(path => this.content.getOne(path))),
      switchMap(contentFetches => zip(contentFetches)),
      tap(contents => this.redirectToAdminWhenEmpty(contents)),
      tap(contents => this.contents$.next(contents)),
      takeUntil(this.whenDestroyed$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.whenDestroyed$.complete();
  }

  private redirectToAdminWhenEmpty(contents: Content[]) {
    if (contents.some(content => !content)) {
      this.router.navigate(['/admin']);
    }
  }

}
