import { Component, OnInit } from '@angular/core';
import { NavigationItem } from './models/navigation-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public navItems: NavigationItem[];

  constructor(private router: Router) {
    this.navItems = [
      { label: 'Dashboard', route: ['dashboard'] },
      { label: 'Content', route: ['content'] },
      { label: 'Media', route: ['media'] },
      { label: 'Settings', route: ['settings'] },
      { label: 'Users', route: ['users'] },
    ];
  }

  ngOnInit(): void {
  }

  public isCurrent(navItem: NavigationItem): boolean {
    return this.router.url === `/${navItem.route}`;
  }

}
