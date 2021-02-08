import { Component, OnInit } from '@angular/core';
import { ContextMenu, TreeNode } from 'src/app/shared/tree-node/tree-node.component';
import { ContentTypeService } from 'src/app/services/content-type/content-type.service';
import { map, tap, take } from 'rxjs/operators';
import { ReplaySubject, Observable } from 'rxjs';
import { ContentType } from 'src/app/services/database/models/contentType.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-content-type-list',
  templateUrl: './content-type-list.component.html',
  styleUrls: ['./content-type-list.component.scss']
})
export class ContentTypeListComponent implements OnInit {

  public rootNodes: TreeNode[];
  public contextMenu: ContextMenu;
  public rootContextMenu: ContextMenu;

  constructor(
    private contentType: ContentTypeService,
    private router: Router,
    private route: ActivatedRoute) {
    this.rootNodes = new Array<TreeNode>();
    this.setupContextMenu();
  }

  ngOnInit(): void {
    this.contentType.getAll().pipe(
      map((res: ContentType[]) => {
        const normalize = (ct => ({
          name: ct.alias,
          children: res.filter(f => f.parentAlias === ct.alias).map(normalize),
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
