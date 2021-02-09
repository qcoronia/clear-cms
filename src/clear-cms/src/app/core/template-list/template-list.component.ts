import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Template } from 'src/app/services/database/models/template.model';
import { TemplateService } from 'src/app/services/template/template.service';
import { ContextMenu, TreeNode } from 'src/app/shared/tree-node/tree-node.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit {

  public rootNodes: TreeNode[];
  public contextMenu: ContextMenu;
  public rootContextMenu: ContextMenu;

  constructor(
    private contentType: TemplateService,
    private router: Router,
    private route: ActivatedRoute) {
    this.rootNodes = new Array<TreeNode>();
    this.setupContextMenu();
  }

  ngOnInit(): void {
    this.contentType.getAll().pipe(
      map((res: Template[]) => {
        const normalize = (t => ({
          name: t.alias,
          children: res.filter(f => f.parentAlias === t.alias).map(normalize),
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
          .fire(`Delete the Template [${alias}]?`, '', 'warning')
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
