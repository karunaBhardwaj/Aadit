import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMedicalPage } from './display-medical.page';

describe('DisplayMedicalPage', () => {
  let component: DisplayMedicalPage;
  let fixture: ComponentFixture<DisplayMedicalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayMedicalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMedicalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
