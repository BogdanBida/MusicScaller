import { Component, OnInit } from '@angular/core';
import { Data } from '../../models/Data';
import { Note } from '../../models/Note';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-stringed',
  templateUrl: './stringed.component.html',
  styleUrls: ['./stringed.component.scss']
})
export class StringedComponent implements OnInit {

  public readonly TUNES = {
    "Standart Guitar" : [43, 38, 34, 29, 24, 19],
    "Violin" : [55, 48, 41, 34],
    "8xString Guitar" : [43, 38, 34, 29, 24, 19, 14, 9],
    "Bass Guitar" : [22, 17, 12, 7],
    "Balalaika" : [48, 43, 43],
    "Ukulele" : [48, 43, 39, 58],
    "DADGAD" : [41, 36, 34, 29, 24, 17],
    "Open D" : [41, 36, 33, 29, 24, 17],
    "Crafty tuning" : [46, 43, 36, 29, 22, 15],
    "Cross A (Sitar)" : [48, 34 ,36, 31, 24, 19]
  };

  constructor(private audioService: AudioService) { }

  public selectTuneName = 'Standart Guitar';
  public selectTune: number[] = this.TUNES[this.selectTuneName];
  public selectScale = "Minor";
  public selectTonic = 7;
  private readonly MAXSTRINGS = 8;
  private readonly MINSTRINGS = 1;
  public readonly FRETS_AMOUNT = 14;
  public stringRows: Note[] = [];
  public readonly SCALES = Data.SCALES;

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
  
  public addString() {
    let len = this.stringRows.length;
    if (len < this.MAXSTRINGS) {
      this.stringRows.push(new Note(this.selectTune[ len % this.selectTune.length ]))
    }
  }

  public wheelPeg(event, i: number) {
    let delta = event.deltaY > 0 ? 1 : -1;
    this.stringRows[i].moveTo(delta);
  }

  public pegChange(i: number, isUp: boolean) {
    this.stringRows[i].moveTo(isUp?1:-1);
  }

  public removeString() {
    let len = this.stringRows.length;
    if (len > this.MINSTRINGS)
      this.stringRows.pop();
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
