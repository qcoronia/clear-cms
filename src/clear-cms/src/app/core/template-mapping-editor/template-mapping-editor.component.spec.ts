import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateMappingEditorComponent } from './template-mapping-editor.component';

describe('TemplateMappingEditorComponent', () => {
  let component: TemplateMappingEditorComponent;
  let fixture: ComponentFixture<TemplateMappingEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateMappingEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateMappingEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
