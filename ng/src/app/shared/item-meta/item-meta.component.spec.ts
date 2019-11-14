import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMetaComponent } from './item-meta.component';

describe('ItemMetaComponent', () => {
  let component: ItemMetaComponent;
  let fixture: ComponentFixture<ItemMetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemMetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
