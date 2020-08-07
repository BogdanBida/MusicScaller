import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TunerService } from './tuner.service';
import { Note } from '../models/Note';

@Component({
  selector: 'app-tuner',
  templateUrl: './tuner.component.html',
  styleUrls: ['./tuner.component.scss']
})
export class TunerComponent implements OnInit, AfterViewInit {

  constructor(private tunerService: TunerService) { }
  @ViewChild('canv') canv: ElementRef;
  public ctx;

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.ctx = this.canv.nativeElement.getContext('2d');
    this.resizeCanv();
    this.ctx.fillStyle = "orange";
  }

  private idInterval = null;
  public data: {
    pitch: any
    note: any,
    detune: any
  } = {
      pitch: null,
      note: null,
      detune: null
    };

  public toogleRec() {
    this.tunerService.toggleLiveInput();
      this.idInterval = setInterval(() => {
        this.data = this.tunerService.getData();
        this.pitchHistory.push(this.data.pitch);
        if (this.pitchHistory.length > this.historyMaxLen) {
          this.pitchHistory.shift();
        }
      this.draw();
    }, 100);
  }

  public W;
  public H;
  public MAX_FR = 1000;
  public pitchHistory: number[] = [];
  private historyMaxLen = 200;
  public draw() {
    this.ctx.clearRect(0, 0, this.W, this.H);
    for (let i = 1; i <= this.pitchHistory.length; i++) {
      this.ctx.beginPath();
      let x = (this.W / this.historyMaxLen) * i;
      let Y = this.H - this.H * (this.pitchHistory[this.pitchHistory.length - i] / this.MAX_FR);
      this.ctx.arc(x, Y, 2, 0, Math.PI*2);
      this.ctx.fill();
      this.ctx.closePath();
    }
    // for (let i = 0; i < 4; i++) {
    //   let a_fr = 110 * Math.pow(2, i);
    //   this.ctx.fillText(a_fr + "Hz", 12, this.H - this.H * (a_fr / this.MAX_FR))
    // }
    // this.ctx.closePath();
  }

  public resizeCanv() {
    this.W = this.canv.nativeElement.clientWidth * window.devicePixelRatio;
    this.H = this.canv.nativeElement.clientHeight * window.devicePixelRatio;
    this.canv.nativeElement.width = this.W;
    this.canv.nativeElement.height = this.H;
  }

  public getNoteName(id) {
    let note = new Note(id);
    return note.getName() + '' + (note.getOctave() - 2);
  }

}
