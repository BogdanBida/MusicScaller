import { Component, OnInit } from '@angular/core';
import { Data } from '../../models/Data';
import { StringRow } from '../../models/StringRow';

@Component({
  selector: 'app-stringed',
  templateUrl: './stringed.component.html',
  styleUrls: ['./stringed.component.scss']
})
export class StringedComponent implements OnInit {

  private readonly MAXSTRINGS = 8;
  private readonly MINSTRINGS = 1;
  public objectKeys = Object.keys;
  public stringRows: StringRow[] = [];
  public readonly SCALES = Data.SCALES;

  public readonly TUNES = {
    "Standart Guitar" : [7, 2, 10, 5, 0, 7],
    "Violin" : [7, 0, 5, 10],
    "8xString Guitar" : [7, 2, 10, 5, 0, 7, 2, 9],
    "Bass Guitar" : [10, 5, 0, 7],
    "Balalaika" : [0,7,7],
    "Ukulele" : [0, 7, 3, 10],
    "DADGAD" : [5, 0, 10, 5, 0, 5],
    "Open D" : [5, 0, 9, 5, 0, 5],
    "Crafty tuning" : [10, 7, 0, 5, 10, 3],
    "Cross A (Sitar)" : [7,0,7,0,7,0],
    "All-Fourth" : [8, 3, 10, 5, 0, 7]
  };

  constructor() { }

  public selectTuneName = 'Standart Guitar';
  public selectTune: number[] = this.TUNES[this.selectTuneName];
  public selectScale = "Minor";
  public selectTonic = 7;

  ngOnInit() {
    this.refreshStrings();
  }

  public refreshStrings(): void {
    this.stringRows = []
    this.selectTune = this.TUNES[this.selectTuneName];
    for (let i = 0; i < this.selectTune.length; i++) {
      this.addString();
    }
   
  }

  public wheel(event, i: number) {
    let delta = event.deltaY > 0 ? 1 : -1;
    this.stringRows[i].firstNote.moveTo(delta);
  }
  public isPitchUp: boolean = true;
  public wheelChange(i: number, isUp: boolean) {
    this.stringRows[i].firstNote.moveTo(isUp?1:-1);
  }

  public addString() {
    let len = this.stringRows.length;
    if (len < this.MAXSTRINGS) {
      this.stringRows.push(new StringRow( this.selectTune[ len % this.selectTune.length ]) );
    }
  }

  public removeString() {
    let len = this.stringRows.length;
    if (len > this.MINSTRINGS)
      this.stringRows.pop();
  }

  public isActiveNote(id: number) {
    let t = this.getStageId(id);
    if (t != 1 && t != 0 && t != 5 && t != 3) return true;
    return false;
  }

  public getStageId(id: number) {
    return this.getScaleMap((12 - (this.selectTonic - id)) % 12);
  }

  private getScaleMap(id: number) {
    return this.SCALES[this.selectScale][id];
  }

}
