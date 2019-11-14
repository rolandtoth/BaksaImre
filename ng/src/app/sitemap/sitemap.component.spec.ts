import {async, ComponentFixture, TestBed} from '@angular/core/testing'

import {SiteMapComponent} from './sitemap.component'

describe('SiteMapComponent', () => {
  let component: SiteMapComponent
  let fixture: ComponentFixture<SiteMapComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SiteMapComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteMapComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
