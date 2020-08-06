import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private AudioContext = window.AudioContext;
  private audioCtx = new this.AudioContext();
  private osc;
  constructor() {
  }

  public async play(id: number, duration?: number) {
    var frq = 440 * Math.pow(2, (id)/12) / 16;
    this.osc = this.audioCtx.createOscillator();
    this.osc.type = "square";
    this.osc.frequency.setValueAtTime(frq, this.audioCtx.currentTime);
    this.osc.connect(this.audioCtx.destination);
    let now = this.audioCtx.currentTime;
    this.osc.start(now);
    if (duration)
    this.osc.stop(now + duration / 1000);
  }

  public async stop() {
    this.osc.stop();
  }
}
