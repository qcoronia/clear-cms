import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.scss']
})
export class DashboardWidgetComponent {

  @Input() public info: DashboardWidgetInfo;

  constructor() { }

}

export class DashboardWidgetInfo {
  public label: string;
  public value: string;
  public subtitle: string;
}
