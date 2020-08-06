import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/models/Data';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-lips-harmonica',
  templateUrl: './lips-harmonica.component.html',
  styleUrls: ['./lips-harmonica.component.scss']
})
export class LipsHarmonicaComponent implements OnInit {
  public SCALES = Data.SCALES;
  public NOTES = Data.NOTES;
  public holes = [
    [39, 41], // c d
    [43, 46], // e g
    [46, 50], // g b
    [51, 53], // c d
    [55, 56], // e f
    [58, 60], // g a
    [63, 62], // c b
    [67, 65], // e d
    [70, 68], // g f
    [75, 72] // c a
  ];

  public selectScale = "Major";
  public selectTonic: number = 3;

  constructor(private audioService: AudioService) { }

  ngOnInit() {
  }

  public getStageId(noteId: number) {
    let stage = 1 + (noteId + 12 - this.selectTonic) % 12;
    return this.SCALES[this.selectScale].includes(stage)? stage:0;
  }

  public async play(id: number) {
    this.audioService.play(id - 12);
  }
  public stopAudio() {
    this.audioService.stop();
  }
}
