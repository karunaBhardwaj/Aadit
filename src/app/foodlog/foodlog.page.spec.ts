import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodlogPage } from './foodlog.page';

describe('FoodlogPage', () => {
  let component: FoodlogPage;
  let fixture: ComponentFixture<FoodlogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodlogPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodlogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
