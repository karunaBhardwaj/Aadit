import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupformPage } from './signupform.page';

describe('SignupformPage', () => {
  let component: SignupformPage;
  let fixture: ComponentFixture<SignupformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupformPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
