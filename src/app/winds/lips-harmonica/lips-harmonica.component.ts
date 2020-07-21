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
    [3, 5], // c d
    [7, 10], // e g
    [10, 14], // g b
    [15, 17], // c d
    [19, 20], // e f
    [22, 24], // g a
    [27, 26], // c b
    [31, 29], // e d
    [34, 32], // g f
    [39, 36] // c a
  ];

  public selectScale = "Major";
  public selectTonic: number = 3;

  constructor(private audioService: AudioService) { }

  ngOnInit() {
  }

  public inTonality(id: number) {
    let scale = Data.SCALES[this.selectScale];
    return scale[(12 - (Number(this.selectTonic) - id)) % 12];
  }

  public async play(id: number) {
    this.audioService.play(id - 12, 700, "triangle");
  }
}
