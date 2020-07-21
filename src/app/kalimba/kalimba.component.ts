import { Component, OnInit } from '@angular/core';
import { Data } from '../models/Data';
import { AudioService } from '../services/audio.service';

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
  public tunes = {
    "Standart 17": [29, 26, 22, 19, 15, 12, 8, 5, 3, 7, 10, 14, 17, 20, 24, 27, 31], //D6 C4 E6
    "Standart 15": [9, 5, 2, 10, 7, 3, 0, 10, 2, 5, 9, 0, 3, 7, 10],// F5 G3 G6
    "Standart 10": [7, 3, 0, 8, 5, 3, 7, 10, 2, 5] // E5 C4 D5
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
    this.audioService.play(id, 150, "sine", [0.02, 0.1,0.1,0.15]);
  }

  public inTonality(id: number) {
      let scale = Data.SCALES[this.selectScale];
      return scale[(12 - (Number(this.selectTonic) - id)) % 12];
  }
}
