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
  
  public readonly NOTE_MAP: number[][] = [ // 0 - open, 1 - closed, 2 - half-closed
    [1,1,1,1,1,1,1,1,1,1], // c
    [1,1,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1,0,0], // d
    [1,1,1,1,1,1,1,0,0,0],
    [1,1,1,1,1,1,0,0,0,0], // e
    [1,1,1,1,1,0,0,0,0,0], // f
    [1,1,1,1,0,1,1,1,1,1],
    [1,1,1,1,0,0,0,0,0,0], // g
    [1,1,1,0,1,1,1,0,0,0],
    [1,1,1,0,0,0,0,0,0,0], // a
    [1,1,0,1,1,0,0,0,0,0],
    [1,1,0,0,0,0,0,0,0,0], // b
    [1,0,1,0,0,0,0,0,0,0], // c
    [1,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0,0,0], // d
    [0,0,1,1,1,1,1,1,0,0],
    [2,1,1,1,1,1,0,0,0,0], // e
    [2,1,1,1,1,0,0,0,0,0], // f
    [2,1,1,1,0,1,0,0,1,1],
    [2,1,1,1,0,0,0,0,0,0], // g
    [2,1,1,1,0,1,1,1,1,1],
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
  public root: number = 51;

  ngOnInit() {
  }

  public getNotes() {
    let result = [];
    let i: number = 0;
    this.NOTE_MAP.forEach(element => {
       result.push({
         fingering: element,
         noteId: this.root + i
       })
       i++;
    });
    return result;
  }

  public trunc(n: number): number {
    return Math.trunc(n);
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

  public setRoot(root: number) {
    this.root = root;
  }
}
