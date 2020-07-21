/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TunerComponent } from './tuner.component';

describe('TunerComponent', () => {
  let component: TunerComponent;
  let fixture: ComponentFixture<TunerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TunerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TunerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
