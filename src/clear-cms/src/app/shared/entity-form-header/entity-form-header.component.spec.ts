import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityFormHeaderComponent } from './entity-form-header.component';

describe('EntityFormHeaderComponent', () => {
  let component: EntityFormHeaderComponent;
  let fixture: ComponentFixture<EntityFormHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityFormHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityFormHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
