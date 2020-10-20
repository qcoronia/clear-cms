import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTypeFormComponent } from './content-type-form.component';

describe('ContentTypeFormComponent', () => {
  let component: ContentTypeFormComponent;
  let fixture: ComponentFixture<ContentTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
