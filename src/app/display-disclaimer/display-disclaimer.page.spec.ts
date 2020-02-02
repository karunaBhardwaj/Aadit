import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDisclaimerPage } from './display-disclaimer.page';

describe('DisplayDisclaimerPage', () => {
  let component: DisplayDisclaimerPage;
  let fixture: ComponentFixture<DisplayDisclaimerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayDisclaimerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDisclaimerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
