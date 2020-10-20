import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab-container-item',
  templateUrl: './tab-container-item.component.html',
  styleUrls: ['./tab-container-item.component.scss']
})
export class TabContainerItemComponent implements OnInit {

  @Input() public label: string;
  @Input() public route: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
