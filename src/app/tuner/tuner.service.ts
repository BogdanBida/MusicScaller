import { Injectable } from '@angular/core';

interface Navigator {
  getUserMedia(
    options: { audio?: boolean},
    success: (stream: any) => void,
    error?: (error: string) => void
  ): void
}

@Injectable({
  providedIn: 'root'
})
export class TunerService {


  private audioContext = null;
  private isPlaying = false;
  private sourceNode = null;
  private analyser = null;
  private theBuffer = null;
  private mediaStreamSource = null;
  private detectorElem;
  private pitchElem;
  private noteElem;
  private detuneElem;
  private detuneAmount;

  public getData() {
    return {
      pitch: this.pitchElem,
      note: this.noteElem,
      detune: this.detuneAmount
    }
  }

  constructor() {
      this.audioContext = new AudioContext();
      let MAX_SIZE = Math.max(4, Math.floor(this.audioContext.sampleRate / 5000));	// corresponds to a 5kHz signal
  }

  public error() {
    console.error('Stream generation failed.');
    alert('Stream generation failed');
  }

  public getUserMedia(dictionary, callback) {
    try {
      navigator.mediaDevices.getUserMedia(dictionary).then(callback).catch(this.error);
    } catch (e) {
      alert('getUserMedia threw exception :' + e);
    }
  }

  public gotStream = (function(stream) {
    // Create an AudioNode from the stream.
    this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream);

    // Connect it to the destination.
      this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    this.mediaStreamSource.connect(this.analyser);
    this.updatePitch();
  }
  ).bind(this)

  public toggleLiveInput() {
    if (this.isPlaying) {
      //stop playing and return
      this.sourceNode.stop(0);
      this.sourceNode = null;
      this.analyser = null;
      this.isPlaying = false;
      if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = window.webkitCancelAnimationFrame;
      window.cancelAnimationFrame(this.rafID);
    }
    this.getUserMedia(
      {
        "audio": {
          "mandatory": {
            "googEchoCancellation": "false",
            "googAutoGainControl": "false",
            "googNoiseSuppression": "false",
            "googHighpassFilter": "false"
          },
          "optional": []
        },
      }, this.gotStream);
  }

  private rafID = null;
  private tracks = null;
  private buflen = 1024;
  private buf = new Float32Array(this.buflen);

  private noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

  public noteFromPitch(frequency) {
    var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    return Math.round(noteNum) + 69;
  }

  public frequencyFromNoteNumber(note) {
    return 440 * Math.pow(2, (note - 69) / 12);
  }

  public centsOffFromPitch(frequency, note) {
    return Math.floor(1200 * Math.log(frequency / this.frequencyFromNoteNumber(note)) / Math.log(2));
  }

  private MIN_SAMPLES = 0;  // will be initialized when AudioContext is created.
  private GOOD_ENOUGH_CORRELATION = 0.9; // this is the "bar" for how close a correlation needs to be

  public autoCorrelate(buf, sampleRate) {
    var SIZE = buf.length;
    var MAX_SAMPLES = Math.floor(SIZE / 2);
    var best_offset = -1;
    var best_correlation = 0;
    var rms = 0;
    var foundGoodCorrelation = false;
    var correlations = new Array(MAX_SAMPLES);

    for (var i = 0; i < SIZE; i++) {
      var val = buf[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01) // not enough signal
      return -1;

    var lastCorrelation = 1;
    for (var offset = this.MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
      var correlation = 0;

      for (var i = 0; i < MAX_SAMPLES; i++) {
        correlation += Math.abs((buf[i]) - (buf[i + offset]));
      }
      correlation = 1 - (correlation / MAX_SAMPLES);
      correlations[offset] = correlation; // store it, for the tweaking we need to do below.
      if ((correlation > this.GOOD_ENOUGH_CORRELATION) && (correlation > lastCorrelation)) {
        foundGoodCorrelation = true;
        if (correlation > best_correlation) {
          best_correlation = correlation;
          best_offset = offset;
        }
      } else if (foundGoodCorrelation) {
        var shift = (correlations[best_offset + 1] - correlations[best_offset - 1]) / correlations[best_offset];
        return sampleRate / (best_offset + (8 * shift));
      }
      lastCorrelation = correlation;
    }
    if (best_correlation > 0.01) {
      // console.log("f = " + sampleRate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")")
      return sampleRate / best_offset;
    }
    return -1;
    //	var best_frequency = sampleRate/best_offset;
  }

  public updatePitch = (function() {
    	this.analyser.getFloatTimeDomainData( this.buf );
    	var ac = this.autoCorrelate( this.buf, this.audioContext.sampleRate );

     	if (ac == -1) { // if undefine pitch
     	} else {
    	 	let pitch = ac;
        this.pitchElem = Math.round( pitch );
    	 	var note =  this.noteFromPitch( pitch );
        // this.noteElem = this.noteStrings[note%12];
        this.noteElem = note + 3;
    		this.detuneAmount = this.centsOffFromPitch( pitch, note );
    	}
    	if (!window.requestAnimationFrame)
    		window.requestAnimationFrame = window.webkitRequestAnimationFrame;
    	this.rafID = window.requestAnimationFrame( this.updatePitch );
  }).bind(this)
}