import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/models/Data';
import { AudioService } from 'src/app/services/audio.service';
import { Note } from 'src/app/models/Note';

@Component({
  selector: 'app-trumpet',
  templateUrl: './trumpet.component.html',
  styleUrls: ['./trumpet.component.scss']
})
export class TrumpetComponent {
  
  public SCALES = Data.SCALES;
  public NOTES = Data.NOTES;
  public selectTonic = 9;
  public selectScale = "Minor";
  public readonly ROOT = 33;
  public fingerchartMap = [7,7,5,4,3,5,2];
  public valvesMap = [[1,1,1],[1,0,1],[0,1,1],[1,1,0],[1,0,0],[0,1,0],[0,0,0]]; // 1-close 0-open

  constructor(private audioService: AudioService) { }

  private readonly NOTE_AMOUNT = 33;

  public getFingerings() {
    let result = [];
    let j = 0;
    let k = 0;
    for (let i = 0; i < this.NOTE_AMOUNT; i++) {
      let fingering = {
        note: new Note(this.ROOT + i),
        valves: this.valvesMap[k + 7 - this.fingerchartMap[j]],
        blow: j + 1
      }
      k++;
      if (k == this.fingerchartMap[j]) {
        k = 0;
        j++;
      }
      if (this.getStageId(fingering.note.getId()) != 0)
        result.push(fingering);
    }
    return result;
  }

  public getStageId(noteId: number) {
    let stage = 1 + (noteId + 12 - this.selectTonic) % 12;
    return this.SCALES[this.selectScale].includes(stage)? stage:0;
  }

  public play(id: number) {
    this.audioService.play(id);
  }
  public stopAudio() {
    this.audioService.stop();
  }
}
