import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentService } from 'src/app/services/content/content.service';
import { DashboardWidgetInfo } from 'src/app/shared/dashboard-widget/dashboard-widget.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public contents$: Observable<DashboardWidgetInfo>;
  public contentTypes$: Observable<DashboardWidgetInfo>;
  public dataTypes$: Observable<DashboardWidgetInfo>;
  public templates$: Observable<DashboardWidgetInfo>;

  constructor(private content: ContentService) {
    this.contents$ = this.content.getAll().pipe(
      map(contents => ({
        label: 'Contents',
        value: contents.length.toString(),
        subtitle: 'site pages',
      }))
    );
    this.contentTypes$ = this.content.getAll().pipe(
      map(contentTypes => ({
        label: 'Content Types',
        value: contentTypes.length.toString(),
        subtitle: 'types of pages',
      }))
    );
    this.dataTypes$ = this.content.getAll().pipe(
      map(dataTypes => ({
        label: 'Data Types',
        value: dataTypes.length.toString(),
        subtitle: 'types of fields',
      }))
    );
    this.templates$ = this.content.getAll().pipe(
      map(templates => ({
        label: 'Templates',
        value: templates.length.toString(),
        subtitle: 'page templates',
      }))
    );
  }

  ngOnInit(): void {
  }

}
