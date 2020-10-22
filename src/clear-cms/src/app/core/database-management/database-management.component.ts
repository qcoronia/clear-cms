import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-database-management',
  templateUrl: './database-management.component.html',
  styleUrls: ['./database-management.component.scss']
})
export class DatabaseManagementComponent implements OnInit {

  constructor(
    private database: DatabaseService,
    private toastr: ToastrService) { }

  public ngOnInit(): void {
  }

  public async reset(): Promise<void> {
    await this.database.initDefaults().toPromise();
    this.toastr.success('Database initialized to defaults');
  }

  public clear(): void {
    this.toastr.success('Database cleared');
  }

}
