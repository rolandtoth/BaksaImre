import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharingButtonsComponent } from './sharing-buttons.component';

describe('SharingButtonsComponent', () => {
  let component: SharingButtonsComponent;
  let fixture: ComponentFixture<SharingButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharingButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharingButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
