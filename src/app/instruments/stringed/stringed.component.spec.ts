/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StringedComponent } from './stringed.component';

describe('StringedComponent', () => {
  let component: StringedComponent;
  let fixture: ComponentFixture<StringedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StringedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
