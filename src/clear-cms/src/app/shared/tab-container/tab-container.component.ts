import { Component, OnInit, ViewChildren, AfterViewInit, ContentChildren, AfterContentInit, Input } from '@angular/core';
import { TabInfo } from './models/tab-info.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.scss']
})
export class TabContainerComponent {

  @Input() public tabs: TabInfo[];

  constructor(private router: Router) { }

  public isCurrent(tab: TabInfo): boolean {
    return this.router.isActive(tab.route, false);
  }

}
