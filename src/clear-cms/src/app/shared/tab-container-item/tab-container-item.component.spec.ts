import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabContainerItemComponent } from './tab-container-item.component';

describe('TabContainerItemComponent', () => {
  let component: TabContainerItemComponent;
  let fixture: ComponentFixture<TabContainerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabContainerItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabContainerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
