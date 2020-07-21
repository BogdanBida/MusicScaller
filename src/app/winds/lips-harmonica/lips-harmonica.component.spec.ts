/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LipsHarmonicaComponent } from './lips-harmonica.component';

describe('LipsHarmonicaComponent', () => {
  let component: LipsHarmonicaComponent;
  let fixture: ComponentFixture<LipsHarmonicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LipsHarmonicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LipsHarmonicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
