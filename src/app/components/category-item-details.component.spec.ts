import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryItemDetailsComponent } from './category-item-details.component';

describe('CategoryItemDetailsComponent', () => {
  let component: CategoryItemDetailsComponent;
  let fixture: ComponentFixture<CategoryItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryItemDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
