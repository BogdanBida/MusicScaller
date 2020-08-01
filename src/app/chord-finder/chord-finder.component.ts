import { Component, OnInit } from '@angular/core';
import { Note } from '../models/Note';
import { Data } from '../models/Data';
import { AudioService } from '../services/audio.service';
import { Chords } from '../chord-finder/chords';

@Component({
  selector: 'app-chord-finder',
  templateUrl: './chord-finder.component.html',
  styleUrls: ['./chord-finder.component.scss']
})
export class ChordFinderComponent implements OnInit {

  constructor(private audioService: AudioService) { }

  public notes: Note[] = []
  public markedNotes: boolean[] = [];
  public notesN: number = 24;
  public NotesName = Data.NOTES;
  public findedChord = "";
  public countActiveNote: number = 0;
  public chordsMap = Chords.chordsMap;
  public selectedChord: string;
  public rootId: number;

  ngOnInit(): void {
    this.initNotes();
  }

  public analyze(): void {
    this.findedChord = null;
    this.countActiveNote = 0;
    let topNoteId;
    for (let i = this.markedNotes.length; i >= 0; i--) {
      if (this.markedNotes[i]) {
        if (this.countActiveNote == 0) topNoteId = i;
        this.countActiveNote++;
        this.rootId = i;
        this.findedChord = this.NotesName[i % 12];
      }
    }
    if (this.countActiveNote < 2) { this.findedChord = null; return };
    if ((topNoteId - this.rootId) < 0) return;

    let keys: string[] = Object.keys(Chords.chordsMap);
    let isFind = false;
    keys.forEach(chordName => {
      let f = true;
      let chord: number[] = Chords.chordsMap[chordName][0];
      if ((topNoteId - this.rootId) <= chord.length) {
        for (let i = this.rootId, ii = 0; ii < chord.length; i++, ii++) {
          if (this.markedNotes[i] != Boolean(chord[ii])) {
            f = false;
            break;
          }
        }
      } else {
        f = false;
      }
      if (f) {
        this.findedChord += chordName;
        isFind = true;
        return;
      }
    });
    if (!isFind) {
      this.findedChord = "noname"
    }
  }

  public initNotes(): void {
    this.notes = [];
    this.markedNotes = [];
    for (let i = 0; i < this.notesN; i++) {
      this.notes.push(new Note(i % 12));
      this.markedNotes.push(false);
    }
  }

  public isBlack(id: number): boolean {
    let blackKeys = [false, true, false, false, true, false, true, false, false, true, false, true];
    return blackKeys[id % 12];
  }

  public toogleNote(id: number): void {
    this.markedNotes[id] = !this.markedNotes[id];
    this.countActiveNote = 0;
    for (let i = this.markedNotes.length; i >= 0; i--) {
      if (this.markedNotes[i]) {
        this.countActiveNote++;
        this.findedChord = this.NotesName[i % 12];
        this.rootId = i;
      }
    }
  }

  public getSelectedNotes(): string[] {
    let selectedNotes: string[] = [];
    for (let i = 0; i < this.markedNotes.length; i++) {
      if (this.markedNotes[i])
        selectedNotes.push(this.notes[i].getName());
    }
    return selectedNotes;
  }

  public async play(id?: number) {
    for (let i = 0; i < this.markedNotes.length; i++) {
      if (this.markedNotes[i]) {
        this.audioService.play(i - 12);
      }
    }
    this.analyze();
  }

  public clear() {
    for (let i = 0; i < this.markedNotes.length; i++) {
      this.markedNotes[i] = false;
    }
    this.countActiveNote = 0;
    this.rootId = null;
  }

  public setChord() {
    if (!this.selectedChord) return;
    let chord = this.chordsMap[this.selectedChord][0];
    for (let i = this.markedNotes.length; i >= 0; i--) {
      if (this.markedNotes[i]) {
        this.rootId = i;
      }
    }
    // ! in clear() rootId become null, so the temp variable is needed
    let tempRootIt = this.rootId;
    //
    this.clear();
    this.rootId = tempRootIt;
    if (chord.length > (this.markedNotes.length - this.rootId)) {
      this.rootId -= 12;
    }
    for (let i = this.rootId, j = 0; i < this.markedNotes.length; i++, j++) {
      if (chord[j] == 1)
        this.markedNotes[i] = true;
      this.countActiveNote++;
    }
    this.analyze();
  }

}
