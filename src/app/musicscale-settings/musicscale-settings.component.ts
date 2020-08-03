import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Data } from '../models/Data';

@Component({
  selector: 'app-musicscale-settings',
  templateUrl: './musicscale-settings.component.html',
  styleUrls: ['./musicscale-settings.component.scss']
})
export class MusicscaleSettingsComponent {
  
  public readonly SCALES = Data.NEW_SCALES;
  public readonly NOTES = Data.NOTES;
  @Input('defaultTonic') public selectTonic: number;
  @Input('defaultScale') public selectScale: string;

  @Output() public scaleEmitter = new EventEmitter<string>();
  @Output() public tonicEmitter = new EventEmitter<number>();

  constructor() { }

  public changeTonic(newValue: number) {
    this.tonicEmitter.emit(newValue);
  }

  public changeScale(newValue: string) {
    this.scaleEmitter.emit(newValue);
  }

}
