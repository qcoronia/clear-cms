import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'src/app/shared/tree-node/tree-node.component';
import { ContentTypeService } from 'src/app/services/content-type/content-type.service';
import { map, tap, take } from 'rxjs/operators';
import { ReplaySubject, Observable } from 'rxjs';
import { ContentType } from 'src/app/services/database/models/contentType.model';

@Component({
  selector: 'app-content-type-list',
  templateUrl: './content-type-list.component.html',
  styleUrls: ['./content-type-list.component.scss']
})
export class ContentTypeListComponent implements OnInit {

  public rootNode: TreeNode;

  constructor(private contentType: ContentTypeService) {
    this.rootNode = new TreeNode();
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
      if (!!res && res.length > 0) {
        this.rootNode = res[0];
      }
    });
  }

}
