import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/models/Data';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-trumpet',
  templateUrl: './trumpet.component.html',
  styleUrls: ['./trumpet.component.scss']
})
export class TrumpetComponent implements OnInit {

  public valvesMap = [[1,1,1],[1,0,1],[0,1,1],[1,1,0],[1,0,0],[0,1,0],[0,0,0]];
  public fingerchartMap = [7,7,5,4,3,5,2];
  public SCALES = Data.NEW_SCALES;
  public NOTES = Data.NOTES;
  public selectTonic = 9;
  public selectScale = "Minor";
  public readonly ROOT = 9;

  constructor(private audioService: AudioService) { }

  ngOnInit() {
  }

  public NoteGRID;

  public getNoteColumns() {
    let cols = [];
    for (let i = 0; i < this.fingerchartMap.length; i++) {
      let notes = [];
      for (let j = 0; j < this.fingerchartMap[i]; j++) {
        let prevNote = i > 0? cols[i-1][cols[i-1].length-1] + 1: this.ROOT; 
        notes.push(j + prevNote);
      }
      cols.push(notes);
    }
    console.log(cols);
    return cols;
  }
  public getGrid(i: number, j: number) {
    let res = this.getNoteColumns()[i][6-j]
    if (!res) res = "_"; 
    return res;
  }

  public getStageId(noteId: number) {
    let stage = 1 + (noteId + 12 - this.selectTonic) % 12;
    return this.SCALES[this.selectScale].includes(stage)? stage:0;
  }

  public getArray(n: number) {
    return new Array(n);
  }

  public play(id: number) {
    this.audioService.play(id - 24, 600, "sawtooth", [0.3,0.5,0.5,0.2]);
  }

  public getOctave(n: number) {
    return Math.trunc((n-3)/12) + 3;
  }

}
