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

  public getStageId(noteId: number) {
    let stage = 1 + (noteId + 12 - this.selectTonic) % 12;
    return this.SCALES[this.selectScale].includes(stage)? stage:0;
  }

  public play(id: number) {
    id = id - Math.trunc((this.countOfKeys - 60)/12)*12
    this.audioService.play(id);
  }
  
  public stopAudio() {
    this.audioService.stop();
  }
}
