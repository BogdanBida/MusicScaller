import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/Note';
import { Data } from '../../models/Data';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.scss']
})
export class PianoComponent {

  public readonly whiteKeys = [true,false,true,true,false,true,false,true,true,false,true,false];

  public selectScale = 'Major';
  public selectTonic = 3;
  public countOfKeys = 48;
  public readonly SCALES = Data.SCALES;

  constructor(private audioService: AudioService) { }
  
  public getNotes() {
    let notes : Note[] = [];
    for (let i = 0; i < this.countOfKeys; i++) {
      notes.push(new Note(i % 12))
    }
    return notes;
  }

  private whiteCount;

  public getKeyWidth() {
    let res = 0;
    if (this.whiteCount) return 100/this.whiteCount;
    for (let i = 0; i < this.countOfKeys; i++) {
      res += this.whiteKeys[i%12]?1:0;
    }
    this.whiteCount = res;
    return (100/res);
  }

  public getBlackMargin(id: number) {
    if (!this.whiteKeys[id%12]) {
      return (-this.getKeyWidth() / 2) + '%';
    }
    return 1 + 'px';
  }

  public isActiveNote(id: number) {
    let t = this.getStageId(id);
    if (t > 7 && t != 12) return true;
    return false;
  }

  public getStageId(id: number) {
    return this.getScaleMap((12 - (this.selectTonic - id)) % 12);
  }

  private getScaleMap(id: number) {
    return this.SCALES[this.selectScale][id];
  }

  public play(id: number) {
    id = id - Math.trunc((this.countOfKeys-12)/12)*12
    this.audioService.play(id, 300, "square", [0.1,0.5,0.0,0.1]);
  }
}
