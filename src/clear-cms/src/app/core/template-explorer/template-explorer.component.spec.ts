import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateExplorerComponent } from './template-explorer.component';

describe('TemplateExplorerComponent', () => {
  let component: TemplateExplorerComponent;
  let fixture: ComponentFixture<TemplateExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateExplorerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
