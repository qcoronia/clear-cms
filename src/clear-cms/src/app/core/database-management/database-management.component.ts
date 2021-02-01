import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-database-management',
  templateUrl: './database-management.component.html',
  styleUrls: ['./database-management.component.scss']
})
export class DatabaseManagementComponent implements OnInit {

  public backupUrl$: Observable<string>;

  constructor(
    private database: DatabaseService,
    private toastr: ToastrService) {
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

  private initBackupUrl(): void {
    this.backupUrl$ = this.database.packAllAsObject().pipe(
      map(data => JSON.stringify(data)),
    );
  }

}
