import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTypeExplorerComponent } from './content-type-explorer.component';

describe('ContentTypeExplorerComponent', () => {
  let component: ContentTypeExplorerComponent;
  let fixture: ComponentFixture<ContentTypeExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentTypeExplorerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTypeExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
