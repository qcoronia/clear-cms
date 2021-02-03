import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss']
})
export class TreeNodeComponent implements OnInit {

  @Input() node: TreeNode;
  @Input() contextMenu: ContextMenu;

  constructor() {
    this.contextMenu = new ContextMenu();
  }

  ngOnInit(): void {
  }

  public toggle(el: MouseEvent): void {
    (el.currentTarget as HTMLElement).classList.toggle('expanded');
    (el.currentTarget as HTMLElement).parentElement.classList.toggle('expanded');
    (el.currentTarget as HTMLElement).parentElement.nextElementSibling?.classList.toggle('expanded');
  }

}

export class TreeNode {
  public name: string;
  public children: TreeNode[];
}

export class ContextMenu {
  public items: ContextMenuItem[];

  constructor() {
    this.items = [];
  }
}

export class ContextMenuItem {
  public label: string;
  public icon: string;
  public action: (alias: string) => void;
}
