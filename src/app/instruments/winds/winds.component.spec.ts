/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WindsComponent } from './winds.component';

describe('WindsComponent', () => {
  let component: WindsComponent;
  let fixture: ComponentFixture<WindsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
