import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audioCtx = new AudioContext();
  
  constructor() {
  }

  public async play(id: number, duration?: number, shape?: string, adsrParam?: number[]) {
    let adsrOption = [0.3,1.0, 1.0, 0.1]; //default a d s r
    if (adsrParam && adsrParam.length == 4) adsrOption = adsrParam
    let osc = this.audioCtx.createOscillator();
    let adsr = this.audioCtx.createGain();
    osc.type = "sine";
    if (shape && (shape === "sine" || shape === "triangle" || shape === "sawtooth" || shape === "square")) {
      osc.type = shape;
    }
    let vibration;
    if (shape === "flute") {
      vibration = this.audioCtx.createOscillator();
      vibration.frequency.value = 4;
      var gain = this.audioCtx.createGain();
      gain.gain.value = 10.0;
      vibration.connect(gain);
      gain.connect(osc.detune);
      vibration.start(0);
    }

    osc.frequency.value = 440 * Math.pow(2, (id) / 12) // formula
    osc.connect(this.audioCtx.destination);

    await new Promise(resolve => {
      setTimeout(() => {
        let stop;
        stop = setInterval(() => {
          if (adsr.gain.value < 0.01 || true) {
            osc.stop();
            if (vibration)
              vibration.stop();
            clearInterval(stop);
          }
        }, 10);

      }, duration ? duration : 500);
    })
    return osc;
  }
}
