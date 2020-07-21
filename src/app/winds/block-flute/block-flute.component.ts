import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/Note';
import { Data } from 'src/app/models/Data';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-block-flute',
  templateUrl: './block-flute.component.html',
  styleUrls: ['./block-flute.component.scss']
})
export class BlockFluteComponent implements OnInit {

  constructor(private audioService: AudioService) { }
  
  public readonly NOTE_MAP = [ // 1 - closed 2 - half-closed
    [1,1,1,1,1,1,1,1,1,1], // 3 note c
    [1,1,1,1,1,1,1,1,1,0], // 4 note 
    [1,1,1,1,1,1,1,1,0,0], // ..  d
    [1,1,1,1,1,1,1,0,0,0],
    [1,1,1,1,1,1,0,0,0,0], // e
    [1,1,1,1,1,0,1,1,1,1], // f
    [1,1,1,1,0,1,1,1,0,0],
    [1,1,1,1,0,0,0,0,0,0], // g
    [1,1,1,0,1,1,1,0,0,0],
    [1,1,1,0,0,0,0,0,0,0], // a
    [1,1,0,1,1,0,0,0,0,0],
    [1,1,0,0,0,0,0,0,0,0], // b
    [1,0,1,0,0,0,0,0,0,0], // c
    [0,1,1,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0,0,0], // d
    [0,0,1,1,1,1,1,1,0,0],
    [2,1,1,1,1,1,0,0,0,0], // e
    [2,1,1,1,1,0,1,1,0,0], // f
    [2,1,1,1,0,1,0,0,0,0],
    [2,1,1,1,0,0,0,0,0,0], // g
    [2,1,1,0,1,0,0,0,0,0],
    [2,1,1,0,0,0,0,0,0,0], // a
    [2,1,1,0,1,1,1,1,0,0],
    [2,1,1,0,1,1,0,0,0,0], // b
    [2,1,0,0,1,1,0,0,0,0], // c
    [2,1,2,1,1,0,1,1,1,1], 
    [2,1,0,1,1,0,1,1,1,0] // 27 note d
  ]
  public NOTES = Data.NOTES;
  public selectTonic: number = 3;
  public selectScale = 'Major';
  public readonly SCALES = Data.SCALES;
  public root = 3;

  ngOnInit() {
  }

  public getNotes() {
    let notes: Note[] = [];
    for (let i = 0; i < 7; i++) {
      notes.push(new Note(i));
    }
    return notes;
  }
  public trunc(n: number): number {
    return Math.trunc(n);
  }

  public isTonality(id: number) {
    let scale = this.SCALES[this.selectScale];
    return scale[(12 - (Number(this.selectTonic) - id)) % 12];
  }

  public async play(id: number) {
      this.audioService.play(id, 400, "flute");
  }
}
