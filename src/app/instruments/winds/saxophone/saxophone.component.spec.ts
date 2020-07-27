/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SaxophoneComponent } from './saxophone.component';

describe('SaxophoneComponent', () => {
  let component: SaxophoneComponent;
  let fixture: ComponentFixture<SaxophoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaxophoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaxophoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
