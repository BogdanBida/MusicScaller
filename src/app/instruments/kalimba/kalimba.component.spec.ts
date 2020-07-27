/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KalimbaComponent } from './kalimba.component';

describe('KalimbaComponent', () => {
  let component: KalimbaComponent;
  let fixture: ComponentFixture<KalimbaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalimbaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalimbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
