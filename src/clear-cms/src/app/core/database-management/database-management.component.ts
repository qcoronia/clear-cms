import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database/database.service';
import { format as formatDate } from 'date-fns';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-database-management',
  templateUrl: './database-management.component.html',
  styleUrls: ['./database-management.component.scss']
})
export class DatabaseManagementComponent implements OnInit {

  public backupUrl$: Observable<SafeResourceUrl>;
  public isBackupUrlReady: boolean = false;

  constructor(
    private database: DatabaseService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer) {
      this.initBackupUrl();
    }

  public ngOnInit(): void {
  }

  public async reset(): Promise<void> {
    await this.database.initDefaults().toPromise();
    this.toastr.success('Database initialized to defaults');
  }

  public clear(): void {
    this.toastr.success('Database cleared');
  }

  public getBackupFileName() {
    return `site-name_${formatDate(new Date(), 'yyyy-MM-dd')}.clearcms`;
  }

  private initBackupUrl(): void {
    this.backupUrl$ = of({}).pipe(
      tap(_ => this.isBackupUrlReady = false),
      switchMap(_ => this.database.packAllAsObject()),
      map(data => JSON.stringify(data)),
      map(json => `data:text/json;charset=utf-8,${btoa(json)}`),
      map(dataUrl => this.sanitizer.bypassSecurityTrustResourceUrl(dataUrl)),
      tap(_ => this.isBackupUrlReady = true),
      shareReplay(1),
    );
  }

}
