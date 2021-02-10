import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { DataTypeService } from 'src/app/services/data-type/data-type.service';
import { DataType } from 'src/app/services/database/models/data-type.model';
import { ContextMenu, TreeNode } from 'src/app/shared/tree-node/tree-node.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-data-type-list',
  templateUrl: './data-type-list.component.html',
  styleUrls: ['./data-type-list.component.scss']
})
export class DataTypeListComponent implements OnInit {

  public rootNodes: TreeNode[];
  public contextMenu: ContextMenu;
  public rootContextMenu: ContextMenu;

  constructor(
    private dataType: DataTypeService,
    private router: Router,
    private route: ActivatedRoute) {
    this.rootNodes = new Array<TreeNode>();
    this.setupContextMenu();
  }

  ngOnInit(): void {
    this.dataType.store.all$.pipe(
      map((res: DataType[]) => {
        const normalize = (dataType => ({
          name: dataType.alias,
          children: res.filter(f => f.parentAlias === dataType.alias).map(normalize),
        } as TreeNode));

        return res.filter(e => !e.parentAlias).map(normalize);
      }),
      take(1)
    ).subscribe(res => {
      this.rootNodes = res;
    });
  }

  private setupContextMenu(): void {
    this.contextMenu = {
      items: [
        { label: 'Add Child Node', icon: 'fa-plus', action: alias => this.router.navigate(['new', alias], { relativeTo: this.route }) },
        { label: 'Delete Node', icon: 'fa-trash', action: alias => Swal
          .fire(`Delete the Content Type [${alias}]?`, '', 'warning')
          .then(res => {
            // if (res.isConfirmed) {
            //   this.contentType.delete(node.alias);
            // }
          }) },
      ]
    };
    this.rootContextMenu = {
      items: [
        { label: 'Add Root Node', icon: 'fa-plus', action: _ => this.router.navigate(['new'], { relativeTo: this.route }) },
      ]
    };
  }

}
