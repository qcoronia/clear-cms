import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTypeExplorerComponent } from './data-type-explorer.component';

describe('DataTypeExplorerComponent', () => {
  let component: DataTypeExplorerComponent;
  let fixture: ComponentFixture<DataTypeExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTypeExplorerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTypeExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
