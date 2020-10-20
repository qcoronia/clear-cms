import { Component, OnInit, ViewChildren, AfterViewInit, ContentChildren, AfterContentInit } from '@angular/core';
import { TabContainerItemComponent } from '../tab-container-item/tab-container-item.component';

@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.scss']
})
export class TabContainerComponent implements AfterContentInit {

  @ContentChildren(TabContainerItemComponent) public tabs: TabContainerItemComponent[];

  public tabLabels: string[];

  constructor() {
    this.tabLabels = [];
  }

  ngAfterContentInit(): void {
    this.tabLabels = this.tabs.map(tab => tab.label);
  }

}
