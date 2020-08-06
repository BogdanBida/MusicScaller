import { Component, OnInit } from '@angular/core';
import { Data } from '../../models/Data';
import { AudioService } from '../../services/audio.service';

class Tongue {
  note: number;
  len: number;
}

@Component({
  selector: 'app-kalimba',
  templateUrl: './kalimba.component.html',
  styleUrls: ['./kalimba.component.scss']
})

export class KalimbaComponent implements OnInit {

  public NOTES = Data.NOTES;
  public tongues: Tongue[] = [];
  public tunes = { // +48
    "Standart 17": [65, 62, 58, 55, 51, 48, 44, 41, 39, 43, 46, 50, 53, 56, 60, 63, 67], //D6 C4 E6
    "Standart 15": [56, 53, 50, 46, 43, 39, 36, 34, 38, 41, 44, 48, 51, 55, 58],// F5 G3 G6
    "Standart 10": [55, 51, 48, 44, 41, 39, 43, 46, 50, 53] // E5 C4 D5
  }
  public selectTuneName = "Standart 17"
  public selectTune = this.tunes[this.selectTuneName];

  constructor(private audioService: AudioService) { }

  ngOnInit() {
  }

  public selectScale: string = "Major";
  public selectTonic: number = 3;
  public SCALES = Data.SCALES;

  public getTongues() {
    let values = [];
    this.tongues = [];
    for (let i = 0; i < this.selectTune.length; i++) {
      this.tongues.push(new Tongue());
      values.push((70 / 17) * (i + 1));
      this.tongues[i].len = 0;
      this.tongues[i].note = this.selectTune[i % this.selectTune.length];
    }
    let right = this.tongues.length - 1;
    let left = 0;

    for (let i = 0; i < values.length; i++) {
      if (i % 2 == 0) {
        this.tongues[right].len = values[i];
        right--;
      } else {
        this.tongues[left].len = values[i];
        left++;
      }
    }
    return this.tongues;
  }

  public round(n) {
    return Math.round(n);
  }

  public play(id: number) {
    this.audioService.play(id);
  }
  public stopAudio() {
    this.audioService.stop();
  }

  public inTonality2(id: number) {
      let scale = Data.SCALES[this.selectScale];
      return scale[(12 - (Number(this.selectTonic) - id)) % 12];
  }
  
  public getStageId(noteId: number) {
    let stage = 1 + (noteId + 12 - this.selectTonic) % 12;
    return this.SCALES[this.selectScale].includes(stage)? stage:0;
  }
}
