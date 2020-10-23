import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss']
})
export class TreeNodeComponent implements OnInit {

  @Input() node: TreeNode;

  constructor() { }

  ngOnInit(): void {
  }

  public toggle(el: MouseEvent): void {
    (el.currentTarget as HTMLElement).parentElement.classList.toggle('active');
    (el.currentTarget as HTMLElement).parentElement.nextElementSibling?.classList.toggle('active');
  }

}

export class TreeNode {
  public name: string;
  public children: TreeNode[];
}
